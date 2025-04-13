import { getEnrollmentRequestsWithOrganizationByIdAction } from "@/actions/create-enrollment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { db } from "@/lib/db";
import { EnrollmentConfirmationState } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formattedPrice } from "@/lib/formatPrice";
import CancelEnrollmentForm from "./_components/CancelEnrollmentForm";

type Props = {
  params: {
    cancellationId: string;
  };
};

const CancelEnrollmentEditPage = async ({ params }: Props) => {
  const cancellation = await db.enrollmentCancellation.findUnique({
    where: {
      id: params.cancellationId,
    },
  });

  const payment = await db.enrollmentPayment.findUnique({
    where: {
      id: cancellation?.paymentId,
    },
  });

  const confirmation = await db.enrollmentConfirmation.findUnique({
    where: {
      id: payment?.confirmationId,
    },
  });

  const enrollmentRequest = await db.enrollmentRequest.findUnique({
    where: { id: confirmation?.requestId },
  });

  const data = await getEnrollmentRequestsWithOrganizationByIdAction(
    enrollmentRequest?.id!,
  );

  const PaymentDetails = () => {
    const courseStart = new Date(enrollmentRequest?.startDate!);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(courseStart);
    dueDate.setDate(dueDate.getDate() - 30);
    const paymentDueDate = dueDate < today ? today : dueDate;

    return (
      <>
        {payment?.remainingBalance! > 0 && (
          <Card className="text-md flex w-full flex-col gap-5 space-y-1 p-3">
            <CardHeader className="flex w-full">
              <h3 className="mx-auto text-xl font-bold">Deposit Summary</h3>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between font-medium text-primary">
                <span>Deposit Paid </span>
                <span>{formattedPrice(payment?.depositAmount!)}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between text-muted-foreground">
                <span>Remaining Balance</span>
                <span>{formattedPrice(payment?.remainingBalance!)}</span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Balance Due By</span>
                <span>
                  {paymentDueDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Deposit Payment Date</span>
                <span>
                  {confirmation?.userConfirmationDate?.toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Payment Method</span>
                <span className="capitalize">{payment?.paymentMethod}</span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Receipt</span>
                <a
                  href={payment?.depositInvoiceUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Receipt
                </a>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Course Start Date</span>
                <span>
                  {new Date(enrollmentRequest?.startDate!).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
        {payment?.remainingBalance === 0 && (
          <div className="flex w-full flex-col gap-3">
            <Card className="text-md flex w-full flex-col gap-5 space-y-1 p-3">
              <CardHeader className="flex w-full">
                <h3 className="mx-auto text-xl font-bold">Deposit Summary</h3>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex justify-between font-medium text-primary">
                  <span>Deposit Paid </span>
                  <span>{formattedPrice(payment?.depositAmount)}</span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-muted-foreground">
                  <span>Deposit Payment Date</span>
                  <span>
                    {confirmation?.userConfirmationDate?.toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Payment Method</span>
                  <span className="capitalize">{payment?.paymentMethod}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Receipt</span>
                  <a
                    href={payment?.depositInvoiceUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Receipt
                  </a>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>View Payment Details</span>
                  <Link
                    href={`/dashboard/payment/${payment.id}`}
                    className="text-blue-600 underline"
                  >
                    Go to Payment Details
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="text-md w-full space-y-1 p-3">
              <CardHeader className="flex w-full">
                <h3 className="mx-auto text-xl font-bold">
                  Full Payment Summary
                </h3>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-rose-500">Total Paid</span>
                  <span className="font-medium text-primary">
                    {formattedPrice(payment.totalPaidAmount)}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-muted-foreground">
                  <span>Full Payment Date</span>
                  <span>
                    {payment.fullPaymentDate?.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Payment Method</span>
                  <span className="capitalize">{payment.paymentMethod}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Receipt</span>
                  <a
                    href={payment.fullPaymentInvoiceUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Receipt
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full justify-start">
        <Button asChild>
          <Link
            href="/dashboard/cancellation"
            className="flex items-center justify-center gap-3"
          >
            <ArrowBigLeft className="h-6 w-6" />
            Back
          </Link>
        </Button>
      </div>
      <div className="my-12 flex flex-col gap-5">
        <PaymentDetails />
        <CancelEnrollmentForm
          enrollment={data.enrollmentRequests!}
          organization={data.enrollmentRequests?.organization!}
          confirmation={confirmation!}
          payment={payment!}
          cancellationId={params.cancellationId}
        />
      </div>
    </div>
  );
};

export default CancelEnrollmentEditPage;
