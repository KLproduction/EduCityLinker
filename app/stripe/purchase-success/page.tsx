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
      enrollmentConfirmation: {
        include: {
          payment: true,
        },
      },
    },
  });
  if (!product?.id) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-3">
        <h1 className="text-xl">No Enrollment Found!</h1>
        <Button asChild variant={"link"} size={"sm"}>
          <Link href={"/"}>Back</Link>
        </Button>
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
    <div className="container pb-12 sm:p-5 sm:pt-20">
      <Card className="m-5 mx-auto max-w-[280px] p-5 sm:max-w-full">
        <CardHeader className="text-xl">
          <div className="flex justify-center font-bold text-orange-500">
            {isSuccess
              ? "Payment success!".toUpperCase()
              : "Something went wrong, order not placed!"}
          </div>
        </CardHeader>
        <div className="text-sm">
          <CardDescription className="flex min-h-full flex-col justify-center">
            <span className="font-bold">Enrollment Reference No.: </span>
            <span>{product?.id}</span>
            <span className="mt-3 font-bold">Center Name:</span>
            <span>{product.organization.name}</span>
            <span className="mt-3 font-bold">Center Address:</span>
            <span>{product.organization.location}</span>
            <span className="mt-3 font-bold">Course title:</span>
            <span>{product.listing.title}</span>
            <span className="mt-3 font-bold">Course Start Date:</span>
            <span>{`${product.startDate.getDate()}/ ${
              product.startDate.getMonth() + 1
            }/ ${product.startDate.getFullYear()}`}</span>
          </CardDescription>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-rose-500">Confirm & Pay</h1>

            <div className="m-5 flex flex-col items-center gap-5">
              <Card className="flex flex-col gap-4 border-border bg-card p-4">
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
                <Card className="text-md w-full space-y-1 p-3">
                  <CardHeader className="flex w-full">
                    <h3 className="mx-auto text-xl font-bold">
                      Deposit Details
                    </h3>
                  </CardHeader>
                  <div className="flex justify-between">
                    <span>Total Course Price</span>
                    <span>£{product.orderTotalPrice}</span>
                  </div>
                  <div className="flex justify-between font-medium text-primary">
                    <span>Deposit (20%)</span>
                    {/* <span>
                      {formattedPrice(
                        product.enrollmentConfirmation[0].payment[0]
                          .depositAmount,
                      )}
                    </span> */}
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-muted-foreground">
                    <span>Remaining Balance</span>
                    {/* <span>
                      {formattedPrice(
                        product.enrollmentConfirmation[0].payment[0]
                          .remainingBalance,
                      )}
                    </span> */}
                  </div>
                  <p className="text-md text-muted-foreground">
                    Balance due by{" "}
                    <strong>
                      {paymentDueDate.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                      })}
                    </strong>
                    {/* <div className="flex justify-between text-muted-foreground">
                      <span>Deposit Paid Date</span>
                      <span>
                        {product.enrollmentConfirmation[0].userConfirmationDate?.getDate()}
                      </span>
                    </div> */}
                  </p>
                </Card>
              </Card>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex justify-end p-5 pb-12">
        <Button asChild variant={"link"} size={"lg"}>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default successPage;
