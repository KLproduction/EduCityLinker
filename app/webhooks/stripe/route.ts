import { db } from "@/lib/db";
import {
  EnrollmentConfirmationState,
  EnrollmentRequestState,
  PaymentState,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2025-02-24.acacia",
    });
    const event = stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("Stripe-Signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
    console.log("EVENT", event.type);
    if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      const enrollmentId = charge.metadata.orderId;
      const email = charge.billing_details.email;
      const pricePaid = charge.amount / 100;
      const shippingAddress = `${charge.shipping?.address?.line1 || ""}${
        charge.shipping?.address?.line2
          ? "," + charge.shipping?.address.line2
          : ""
      },${charge.shipping?.address?.city},${
        charge.shipping?.address?.postal_code
      }`;

      const orderType = charge.metadata?.orderType;

      if (orderType === "deposit") {
        const existingEnrollment = await db.enrollmentRequest.findUnique({
          where: { id: enrollmentId },
        });
        if (!existingEnrollment || !email) {
          return new NextResponse("No existingEnrollmentRequest", {
            status: 400,
          });
        }

        const enrollmentRequest = await db.enrollmentRequest.update({
          where: { id: existingEnrollment.id },
          data: { status: EnrollmentRequestState.CONFIRM_BY_USER },
        });

        let enrollmentConfirm = await db.enrollmentConfirmation.findFirst({
          where: {
            requestId: existingEnrollment.id,
            userId: existingEnrollment.userId,
          },
        });

        if (!enrollmentConfirm) {
          enrollmentConfirm = await db.enrollmentConfirmation.create({
            data: {
              requestId: existingEnrollment.id,
              userId: existingEnrollment.userId,
              confirmedByUser: true,
              userConfirmationDate: new Date(),
              status: EnrollmentConfirmationState.DEPOSIT_PAID,
            },
          });
        } else {
          await db.enrollmentConfirmation.update({
            where: { id: enrollmentConfirm.id },
            data: {
              confirmedByUser: true,
              userConfirmationDate: new Date(),
              status: EnrollmentConfirmationState.DEPOSIT_PAID,
            },
          });
        }

        let enrollmentPayment = await db.enrollmentPayment.findFirst({
          where: {
            confirmationId: enrollmentConfirm.id,
            userId: existingEnrollment.userId,
          },
        });

        if (!enrollmentPayment) {
          const depositAmount = Math.floor(
            existingEnrollment.coursePrice * existingEnrollment.weeks * 0.2,
          );
          const fullPaymentDueDate = new Date(existingEnrollment.startDate);
          fullPaymentDueDate.setDate(fullPaymentDueDate.getDate() - 30);
          enrollmentPayment = await db.enrollmentPayment.create({
            data: {
              confirmationId: enrollmentConfirm.id,
              userId: existingEnrollment.userId,
              depositAmount: depositAmount,
              remainingBalance:
                existingEnrollment.orderTotalPrice - depositAmount,
              totalPaidAmount: depositAmount,
              depositPaymentDate: new Date(),
              depositPaid: true,
              paymentMethod: charge.payment_method_details?.type,
              depositTransactionId: charge.id,
              status: PaymentState.DEPOSIT_PAID,
              depositInvoiceUrl: charge.receipt_url,
              fullPaymentDueDate: fullPaymentDueDate,
            },
          });
        } else {
          const depositAmount = Math.floor(
            existingEnrollment.coursePrice * existingEnrollment.weeks * 0.2,
          );
          const fullPaymentDueDate = new Date(existingEnrollment.startDate);
          fullPaymentDueDate.setDate(fullPaymentDueDate.getDate() - 30);
          enrollmentPayment = await db.enrollmentPayment.update({
            where: { id: enrollmentPayment.id },
            data: {
              depositAmount: depositAmount,
              remainingBalance:
                existingEnrollment.orderTotalPrice - depositAmount,
              totalPaidAmount: depositAmount,
              depositPaymentDate: new Date(),
              depositPaid: true,
              paymentMethod: charge.payment_method_details?.type,
              depositTransactionId: charge.id,
              status: PaymentState.DEPOSIT_PAID,
              fullPaymentDueDate: fullPaymentDueDate,
              depositInvoiceUrl: charge.receipt_url,
            },
          });
        }
        return new NextResponse("ok", { status: 200 });
      }

      if (orderType === "full") {
        const existingEnrollment = await db.enrollmentRequest.findUnique({
          where: { id: enrollmentId },
        });
        if (!existingEnrollment || !email) {
          return new NextResponse("No existingEnrollmentRequest", {
            status: 400,
          });
        }

        const enrollmentConfirm = await db.enrollmentConfirmation.findFirst({
          where: {
            requestId: existingEnrollment.id,
            userId: existingEnrollment.userId,
          },
        });

        if (!enrollmentConfirm) {
          return new NextResponse("No existingEnrollmentConfirmation", {
            status: 400,
          });
        }

        const confirmation = await db.enrollmentConfirmation.update({
          where: { id: enrollmentConfirm.id },
          data: { status: EnrollmentConfirmationState.FULLY_PAID },
        });

        if (confirmation) {
          console.log("confirmation", confirmation.status);
        }

        const existingEnrollmentPayment = await db.enrollmentPayment.findFirst({
          where: {
            confirmationId: enrollmentConfirm.id,
            userId: existingEnrollment.userId,
          },
        });

        if (!existingEnrollmentPayment) {
          return new NextResponse("No existingEnrollmentPayment", {
            status: 400,
          });
        }

        await db.enrollmentPayment.update({
          where: { id: existingEnrollmentPayment.id },
          data: {
            paymentMethod: charge.payment_method_details?.type,
            fullPaymentTransactionId: charge.id,
            status: PaymentState.FULLY_PAID,
            fullPaymentPaid: true,
            fullPaymentDate: new Date(),
            fullPaymentInvoiceUrl: charge.receipt_url,
            remainingBalance:
              existingEnrollment.orderTotalPrice - charge.amount / 100,
            totalPaidAmount:
              existingEnrollmentPayment.depositAmount + charge.amount / 100,
          },
        });
        return new NextResponse("ok", { status: 200 });
      }

      console.log("Unhandled event type:", event.type);
      return new NextResponse("Event type not handled", { status: 400 });
    }

    if (event.type === "charge.updated") {
      console.log("🔄 Charge was updated:", event.data.object.id);
      return new NextResponse("ok", { status: 200 });
    }

    if (event.type === "charge.refunded") {
      const charge = event.data.object;
      const enrollmentId = charge.metadata?.orderId;
      const refundAmount = charge.amount_refunded / 100;
      console.log(
        `Refund received for enrollment ${enrollmentId}: £${refundAmount}`,
      );

      return new NextResponse("ok", { status: 200 });
    }

    // Missing return for non "charge.succeeded" events:
    return new NextResponse("Event type not handled", { status: 400 });
  } catch (err) {
    console.error("Webhook Error:", err);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
