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

      const existingEnrollment = await db.enrollmentRequest.findUnique({
        where: { id: enrollmentId },
      });
      if (!existingEnrollment || !email) {
        return new NextResponse("Bad Request", { status: 400 });
      }

      if (existingEnrollment) {
        const enrollmentRequest = await db.enrollmentRequest.update({
          where: { id: existingEnrollment.id },
          data: {
            status: EnrollmentRequestState.CONFIRM_BY_USER,
          },
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
            transactionId: charge.id,
          },
        });

        if (!enrollmentPayment) {
          enrollmentPayment = await db.enrollmentPayment.create({
            data: {
              confirmationId: enrollmentConfirm.id,
              userId: existingEnrollment.userId,
              depositAmount: Math.floor(
                existingEnrollment.orderTotalPrice * 0.2,
              ),
              remainingBalance:
                existingEnrollment.orderTotalPrice -
                Math.floor(existingEnrollment.orderTotalPrice * 0.2),
              depositPaymentDate: new Date(),
              depositPaid: true,
              paymentMethod: charge.payment_method_details?.type,
              transactionId: charge.id,
              status: PaymentState.DEPOSIT_PAID,
            },
          });
        } else {
          enrollmentPayment = await db.enrollmentPayment.update({
            where: { id: enrollmentPayment.id },
            data: {
              depositAmount: Math.floor(
                existingEnrollment.orderTotalPrice * 0.2,
              ),
              remainingBalance:
                existingEnrollment.orderTotalPrice -
                Math.floor(existingEnrollment.orderTotalPrice * 0.2),
              depositPaymentDate: new Date(),
              depositPaid: true,
              paymentMethod: charge.payment_method_details?.type,
              transactionId: charge.id,
              status: PaymentState.DEPOSIT_PAID,
            },
          });
        }
      }
    }

    return new NextResponse("ok", { status: 200 });
  } catch (err) {
    console.error("Webhook Error:", err);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
