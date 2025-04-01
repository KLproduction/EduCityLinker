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
import MyLoader from "@/loader/MyLoader";
import { EnrollmentRequest } from "@prisma/client";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Stripe from "stripe";

const SuccessPage = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent,
  );

  if (paymentIntent.metadata.orderId == null) {
    console.log("Enrollment ID is NULL");
  }

  const orderType = paymentIntent.metadata.orderType;

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

  if (!enrollmentConfirm || !enrollmentPayment) {
    return <MyLoader />;
  }

  // if (!enrollmentPayment || !enrollmentConfirm) {
  //   return (
  //     <div className="mt-24 flex flex-col items-center justify-center gap-3">
  //       <div className="flex flex-col items-center justify-center gap-3">
  //         <h1 className="flex items-center justify-center text-xl">
  //           Something went wrong! Payment Not Success
  //         </h1>

  //         <Button asChild size={"sm"}>
  //           <Link href={`/enrollment/${paymentIntent.metadata.useId}`}>
  //             Back
  //           </Link>
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  const courseStart = new Date(product.startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(courseStart);
  dueDate.setDate(dueDate.getDate() - 30);
  const paymentDueDate = dueDate < today ? today : dueDate;

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div className="container flex flex-col items-center gap-5 pb-12 sm:p-5 sm:pt-20">
      <div className="flex w-full justify-start">
        <Button size={"lg"} className="flex items-center gap-3">
          <ArrowBigLeft className="h-6 w-6" />
          <Link href={`/enrollment/${paymentIntent.metadata.userId}`}>
            Back
          </Link>
        </Button>
      </div>
      <div className="flex justify-center text-4xl font-bold text-rose-500">
        {isSuccess
          ? "Payment success!".toUpperCase()
          : "Something went wrong, order not placed!"}
      </div>
      <div className="m-5 mx-auto max-w-[280px] p-5 sm:max-w-full">
        <div className="text-sm">
          {orderType === "deposit" && (
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
                  <span>
                    {formattedPrice(enrollmentPayment?.depositAmount!)}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-muted-foreground">
                  <span>Remaining Balance</span>
                  <span>
                    {formattedPrice(enrollmentPayment?.remainingBalance!)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span> Balance due by</span>
                  <span>
                    {paymentDueDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-md text-muted-foreground">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Deposit Paid Date</span>
                    <span>
                      {`${enrollmentConfirm?.userConfirmationDate?.toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}`}
                    </span>
                  </div>
                </p>
              </CardContent>
            </Card>
          )}
          {orderType === "full" && (
            <Card className="text-md w-full space-y-1 p-3">
              <CardHeader className="flex w-full">
                <h3 className="mx-auto text-xl font-bold">
                  Remaining Balance Details
                </h3>
              </CardHeader>
              <div className="flex justify-between">
                <span>Total Course Price</span>
                <span className="text-green-600">
                  {formattedPrice(product.orderTotalPrice)}
                </span>
              </div>
              <div className="flex justify-between font-medium text-primary">
                <span>Total Paid</span>
                <span className="text-green-600">
                  {formattedPrice(
                    enrollmentPayment?.depositAmount! +
                      enrollmentPayment?.remainingBalance!,
                  )}
                </span>
              </div>

              <p className="text-md text-muted-foreground">
                Full Payment at:{" "}
                <strong>
                  {enrollmentPayment?.fullPaymentDate?.toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </strong>
              </p>
            </Card>
          )}

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
                    enrollmentConfirmation={enrollmentConfirm!}
                  />
                </div>
              </div>
              <Button
                asChild
                className="w-full md:mx-auto md:flex md:w-auto md:justify-center"
              >
                <Link href={`/enrollment/${product.userId}`}>
                  Back to My Enrollment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
