import { getEnrollmentRequestsWithOrganizationByIdAction } from "@/actions/create-enrollment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditEnrollmentForm from "./_components/EditEnrollmentForm";
import { ArrowBigLeft } from "lucide-react";
import { db } from "@/lib/db";
import { EnrollmentConfirmationState } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formattedPrice } from "@/lib/formatPrice";

type Props = {
  params: {
    cancellationId: string;
  };
};

const CancelEnrollmentEditPage = async ({ params }: Props) => {
  const data = await getEnrollmentRequestsWithOrganizationByIdAction(
    params.cancellationId,
  );

  let confirmation = undefined;
  confirmation = await db.enrollmentConfirmation.findFirst({
    where: {
      requestId: params.cancellationId,
    },
  });

  let payment = undefined;

  if (confirmation) {
    payment = await db.enrollmentPayment.findFirst({
      where: {
        confirmationId: confirmation.id,
      },
    });
  }

  const PaymentDetails = async () => {
    const enrollmentConfirmation = await db.enrollmentConfirmation.findFirst({
      where: {
        requestId: params.cancellationId,
      },
    });

    const enrollmentPayment = await db.enrollmentPayment.findFirst({
      where: {
        confirmationId: confirmation?.id!,
      },
    });
    if (
      !enrollmentPayment ||
      !enrollmentConfirmation ||
      !data.enrollmentRequests
    ) {
      return;
    }

    const courseStart = new Date(data.enrollmentRequests.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(courseStart);
    dueDate.setDate(dueDate.getDate() - 30);
    const paymentDueDate = dueDate < today ? today : dueDate;

    return (
      <>
        {enrollmentPayment.status ===
          EnrollmentConfirmationState.DEPOSIT_PAID && (
          <Card className="text-md flex w-full flex-col gap-5 space-y-1 p-3">
            <CardHeader className="flex w-full">
              <h3 className="mx-auto text-xl font-bold">Deposit Summary</h3>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between font-medium text-primary">
                <span>Deposit Paid </span>
                <span>{formattedPrice(enrollmentPayment.depositAmount)}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between text-muted-foreground">
                <span>Remaining Balance</span>
                <span>
                  {formattedPrice(enrollmentPayment.remainingBalance)}
                </span>
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
                  {enrollmentConfirmation?.userConfirmationDate?.toLocaleDateString(
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
                <span className="capitalize">
                  {enrollmentPayment?.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Receipt</span>
                <a
                  href={enrollmentPayment?.depositInvoiceUrl!}
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
                  {new Date(
                    data.enrollmentRequests.startDate,
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="mt-3 flex w-full items-center">
                <Button asChild className="w-full">
                  <Link href={`/dashboard/payment/${enrollmentPayment.id}`}>
                    Go to Payment Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        {enrollmentPayment.status ===
          EnrollmentConfirmationState.FULLY_PAID && (
          <div className="flex w-full flex-col gap-3">
            <Card className="text-md flex w-full flex-col gap-5 space-y-1 p-3">
              <CardHeader className="flex w-full">
                <h3 className="mx-auto text-xl font-bold">Deposit Summary</h3>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex justify-between font-medium text-primary">
                  <span>Deposit Paid </span>
                  <span>{formattedPrice(enrollmentPayment.depositAmount)}</span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-muted-foreground">
                  <span>Deposit Payment Date</span>
                  <span>
                    {enrollmentConfirmation?.userConfirmationDate?.toLocaleDateString(
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
                  <span className="capitalize">
                    {enrollmentPayment?.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Receipt</span>
                  <a
                    href={enrollmentPayment?.depositInvoiceUrl!}
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
                    href={`/dashboard/payment/${enrollmentPayment.id}`}
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
                    {formattedPrice(enrollmentPayment.totalPaidAmount)}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-muted-foreground">
                  <span>Full Payment Date</span>
                  <span>
                    {enrollmentPayment.fullPaymentDate?.toLocaleDateString(
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
                  <span className="capitalize">
                    {enrollmentPayment.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Receipt</span>
                  <a
                    href={enrollmentPayment.fullPaymentInvoiceUrl!}
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
            href="/dashboard/enrollment"
            className="flex items-center justify-center gap-3"
          >
            <ArrowBigLeft className="h-6 w-6" />
            Back
          </Link>
        </Button>
      </div>
      <div className="my-12 flex flex-col gap-5">
        <EditEnrollmentForm
          enrollment={data.enrollmentRequests!}
          organization={data.enrollmentRequests?.organization!}
          confirmation={confirmation || undefined}
          payment={payment || undefined}
        />
        {await PaymentDetails()}
      </div>
    </div>
  );
};

export default CancelEnrollmentEditPage;
