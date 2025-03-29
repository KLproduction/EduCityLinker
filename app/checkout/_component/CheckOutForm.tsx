"use client";

import UserEnrollmentDetailsSection from "@/app/enrollment/_compoents/UserEnrollmentDetailsSection";
import ListingHeader from "@/app/listing/[organizationId]/_components/ListingHeader";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import MySpinner from "@/components/ui/MySpinner";
import { Separator } from "@/components/ui/separator";
import { formattedPrice } from "@/lib/formatPrice";
import MyLoader from "@/loader/MyLoader";
import { EnrollmentRequest, Listing, Organization } from "@prisma/client";

import {
  AddressElement,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDispatch } from "react-redux";

type CheckOutFormProps = {
  enrollment: EnrollmentRequest;
  organization: Organization;
  listing: Listing;
  clientSecret: string;
};

type FormProps = {
  orderPrice: number;
};
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckOutForm = ({
  enrollment,
  organization,
  listing,
  clientSecret,
}: CheckOutFormProps) => {
  const depositAmount = Math.floor(enrollment.orderTotalPrice * 0.2);
  const remainingBalance = enrollment.orderTotalPrice - depositAmount;

  const courseStart = new Date(enrollment.startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(courseStart);
  dueDate.setDate(dueDate.getDate() - 30);
  const paymentDueDate = dueDate < today ? today : dueDate;

  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container mx-auto w-full space-y-8">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-rose-500">Confirm & Pay</h1>

        <div className="m-5 flex flex-col items-center gap-5">
          <Card className="flex flex-col gap-4 border-border bg-card p-4">
            <div>
              <UserEnrollmentDetailsSection
                enrollmentData={enrollment}
                organization={organization!}
                listing={listing!}
                userId={enrollment.userId}
                isCheckOut
              />
            </div>
            {/* Summary */}
            <Card className="text-md w-full space-y-1 p-3">
              <CardHeader className="flex w-full">
                <h3 className="mx-auto text-xl font-bold">Deposit Details</h3>
              </CardHeader>
              <div className="flex justify-between">
                <span>Total Course Price</span>
                <span>£{enrollment.orderTotalPrice}</span>
              </div>
              <div className="flex justify-between font-medium text-primary">
                <span>Deposit (20%)</span>
                <span>{formattedPrice(depositAmount)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-muted-foreground">
                <span>Remaining Balance</span>
                <span>{formattedPrice(remainingBalance)}</span>
              </div>
              <p className="text-md text-muted-foreground">
                Balance due by{" "}
                <strong>
                  {paymentDueDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                  })}
                </strong>
              </p>
            </Card>
          </Card>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 text-green-500">
        <span>Please use dummy payment details in this demo.</span>
        <span>Card number: 4242 4242 4242 4242</span>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form orderPrice={depositAmount} />
      </Elements>
    </div>
  );
};
const Form = ({ orderPrice }: FormProps) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(!loading);
    if (stripe == null || elements == null) return;
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        setLoading(false);
        if (
          error?.type === "card_error" ||
          error?.type === "validation_error"
        ) {
          setError(error.message);
        } else {
          setPaymentSuccess(true);
        }
      });

    setLoading(!loading);
  };

  return (
    <>
      {loading && <MySpinner />}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>Confirm Payment</CardHeader>
          <CardDescription>
            <FormError />
          </CardDescription>
          <CardContent>
            <PaymentElement />
            <div className="my-4">
              <LinkAuthenticationElement />
              <AddressElement options={{ mode: "shipping" }} />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-full"
              disabled={stripe == null || elements == null || pending}
            >
              {loading
                ? "Purchasing..."
                : `Check Out ${formattedPrice(orderPrice)}`}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default CheckOutForm;
