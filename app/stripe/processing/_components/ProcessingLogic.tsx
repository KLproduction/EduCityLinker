import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { EnrollmentConfirmationState } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function ProcessingLogic({
  payment_intent,
}: {
  payment_intent: string;
}) {
  if (!payment_intent) {
    return errorSection("Missing payment intent ID");
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_SERVER_URL) {
    return errorSection("Server configuration error (env missing)");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  let paymentIntent: Stripe.PaymentIntent;

  try {
    paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
  } catch (error) {
    console.error("Stripe retrieve error:", error);
    return errorSection("Failed to retrieve payment details from Stripe");
  }

  if (!paymentIntent?.metadata?.orderId) {
    return errorSection("Missing order ID in Stripe metadata");
  }

  const orderType = paymentIntent.metadata.orderType;

  let product;
  try {
    product = await db.enrollmentRequest.findUnique({
      where: {
        id: paymentIntent.metadata.orderId,
      },
      include: {
        organization: true,
        listing: true,
      },
    });
  } catch (error) {
    console.error("DB error while fetching enrollmentRequest:", error);
    return errorSection("Unable to fetch enrollment request from database");
  }

  if (!product?.id) {
    return errorSection("No Enrollment Found", paymentIntent);
  }

  if (orderType === "deposit") {
    return await handleDepositFlow(product.id, payment_intent);
  }

  if (orderType === "full") {
    return await handleFullPaymentFlow(product.id, payment_intent);
  }

  return errorSection("Unknown order type", paymentIntent); // fallback for unexpected orderType
}

// ─── Logic for deposit payments ───────────────────────────────────────────────
async function handleDepositFlow(requestId: string, payment_intent: string) {
  let enrollmentConfirm = null;
  let retries = 10;

  while (!enrollmentConfirm && retries > 0) {
    enrollmentConfirm = await db.enrollmentConfirmation.findFirst({
      where: { requestId },
    });
    if (!enrollmentConfirm) {
      retries--;
      await new Promise((res) => setTimeout(res, 500));
    }
  }

  if (!enrollmentConfirm) {
    return errorSection("Enrollment confirmation not created");
  }

  let enrollmentPayment = null;
  retries = 10;

  while (!enrollmentPayment && retries > 0) {
    enrollmentPayment = await db.enrollmentPayment.findFirst({
      where: { confirmationId: enrollmentConfirm.id },
    });
    if (!enrollmentPayment) {
      retries--;
      await new Promise((res) => setTimeout(res, 1000));
    }
  }

  if (!enrollmentPayment) {
    return errorSection("Payment not recorded in system");
  }

  redirect(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success?payment_intent=${payment_intent}`,
  );
}

// ─── Logic for full payments ──────────────────────────────────────────────────
async function handleFullPaymentFlow(
  requestId: string,
  payment_intent: string,
) {
  let enrollmentConfirm = null;
  let retries = 10;

  while (retries > 0) {
    enrollmentConfirm = await db.enrollmentConfirmation.findFirst({
      where: { requestId },
    });

    if (
      enrollmentConfirm &&
      enrollmentConfirm.status === EnrollmentConfirmationState.FULLY_PAID
    ) {
      break;
    }

    retries--;
    await new Promise((res) => setTimeout(res, 500));
  }

  if (
    !enrollmentConfirm ||
    enrollmentConfirm.status !== EnrollmentConfirmationState.FULLY_PAID
  ) {
    return errorSection("Enrollment not marked as FULLY_PAID");
  }

  let enrollmentPayment = null;
  retries = 10;

  while (retries > 0) {
    enrollmentPayment = await db.enrollmentPayment.findFirst({
      where: { confirmationId: enrollmentConfirm.id },
    });

    if (enrollmentPayment?.fullPaymentPaid) break;

    retries--;
    await new Promise((res) => setTimeout(res, 1000));
  }

  if (!enrollmentPayment?.fullPaymentPaid) {
    return errorSection("Full payment not marked as paid");
  }

  redirect(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success?payment_intent=${payment_intent}`,
  );
}

// ─── Reusable error section ───────────────────────────────────────────────────
function errorSection(message: string, paymentIntent?: Stripe.PaymentIntent) {
  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-3">
      <h1 className="text-xl text-red-500">{message}</h1>
      <Button asChild size="sm">
        <Link
          href={
            paymentIntent?.metadata?.userId
              ? `/enrollment/${paymentIntent.metadata.userId}`
              : `/explore`
          }
        >
          Back
        </Link>
      </Button>
    </div>
  );
}
