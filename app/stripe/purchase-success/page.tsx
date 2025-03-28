import UserEnrollmentDetailsSection from "@/app/enrollment/_compoents/UserEnrollmentDetailsSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { formattedPrice } from "@/lib/formatPrice";
import { EnrollmentRequest } from "@prisma/client";
import Link from "next/link";
import Stripe from "stripe";

type CheckOutFormProps = {
  enrollment: EnrollmentRequest;
  clientSecret: string;
};

const successPage = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent,
  );

  console.log(paymentIntent.metadata);

  if (paymentIntent.metadata.orderId == null) {
    console.log("Enrollment ID is NULL");
  }
  const product = await db.enrollmentRequest.findUnique({
    where: {
      id: paymentIntent.metadata.orderId,
    },
    include: {
      organization: true,
      listing: true,
    },
  });
  if (!product?.id) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-3">
        <h1 className="text-xl">No Enrollment Found</h1>
        <Button asChild variant={"link"} size={"sm"}>
          <Link href={`/enrollment/${paymentIntent.metadata.useId}`}>Back</Link>
        </Button>
      </div>
    );
  }

  const enrollmentConfirm = await db.enrollmentConfirmation.findFirst({
    where: {
      requestId: product.id,
    },
  });

  const enrollmentPayment = await db.enrollmentPayment.findFirst({
    where: {
      confirmationId: enrollmentConfirm?.id,
    },
  });

  if (!enrollmentPayment || !enrollmentConfirm) {
    return (
      <div className="mt-24 flex flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="flex items-center justify-center text-xl">
            Something went wrong! Payment Not Success
          </h1>

          <Button asChild size={"sm"}>
            <Link href={`/enrollment/${paymentIntent.metadata.useId}`}>
              Back
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const courseStart = new Date(product.startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(courseStart);
  dueDate.setDate(dueDate.getDate() - 30);
  const paymentDueDate = dueDate < today ? today : dueDate;

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div className="container flex flex-col items-center gap-5 pb-12 sm:p-5 sm:pt-20">
      <div className="flex justify-center text-4xl font-bold text-rose-500">
        {isSuccess
          ? "Payment success!".toUpperCase()
          : "Something went wrong, order not placed!"}
      </div>
      <div className="m-5 mx-auto max-w-[280px] p-5 sm:max-w-full">
        <div className="text-sm">
          <Card className="text-md w-full space-y-1 p-3">
            <CardHeader className="flex w-full">
              <h3 className="mx-auto text-xl font-bold">Deposit Details</h3>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>Total Course Price</span>
                <span>£{product.orderTotalPrice}</span>
              </div>
              <div className="flex justify-between font-medium text-primary">
                <span>Deposit (20%)</span>
                <span>{formattedPrice(enrollmentPayment?.depositAmount!)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-muted-foreground">
                <span>Remaining Balance</span>
                <span>
                  {formattedPrice(enrollmentPayment?.remainingBalance!)}
                </span>
              </div>
              <p className="text-md text-muted-foreground">
                Balance due by{" "}
                <strong>
                  {paymentDueDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                  })}
                </strong>
                <div className="flex justify-between text-muted-foreground">
                  <span>Deposit Paid Date</span>
                  <span>
                    {`${enrollmentConfirm?.userConfirmationDate?.toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                      },
                    )}`}
                  </span>
                </div>
              </p>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center">
            <div className="m-5 flex flex-col items-center gap-5">
              <div className="flex flex-col gap-4 border-border bg-card p-4">
                <div>
                  <UserEnrollmentDetailsSection
                    enrollmentData={product}
                    organization={product.organization!}
                    listing={product.listing!}
                    userId={product.userId}
                    isCheckOut
                  />
                </div>
                {/* Summary */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end p-5 pb-12">
        <Button asChild variant={"link"} size={"lg"}>
          <Link href={`/enrollment/${paymentIntent.metadata.userId}`}>
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default successPage;
