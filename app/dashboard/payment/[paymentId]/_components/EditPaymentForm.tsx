"use client";

import {
  EnrollmentConfirmation,
  EnrollmentConfirmationState,
  EnrollmentPayment,
  EnrollmentRequest,
} from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { formattedPrice } from "@/lib/formatPrice";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Props = {
  payment: EnrollmentPayment;
  confirmation: EnrollmentConfirmation;
  enrollment: EnrollmentRequest;
};
const EditPaymentForm = ({ payment, confirmation, enrollment }: Props) => {
  const courseStart = new Date(enrollment?.startDate!);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(courseStart);
  dueDate.setDate(dueDate.getDate() - 30);
  const paymentDueDate = dueDate < today ? today : dueDate;

  return (
    <Card>
      <CardHeader className="items-end bg-rose-200">
        <Badge className="mx-auto w-fit" variant="outline">
          {payment.status.replaceAll("_", " ").toLowerCase()}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-3">
        {payment?.status === EnrollmentConfirmationState.DEPOSIT_PAID && (
          <Card className="text-md flex w-full flex-col gap-5 space-y-1 border-none p-3 shadow-none">
            <CardHeader className="flex w-full">
              <h3 className="mx-auto text-xl font-bold">Deposit Summary</h3>
              <CardDescription>
                <div className="flex flex-col justify-between text-xs text-muted-foreground">
                  <span>Deposit Transaction ID:</span>
                  <span className="truncate">
                    {payment.depositTransactionId || "—"}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between font-medium text-primary">
                <span>Deposit Paid </span>
                <span>{formattedPrice(payment.depositAmount)}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between text-muted-foreground">
                <span>Remaining Balance</span>
                <span>{formattedPrice(payment.remainingBalance)}</span>
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
                  {new Date(enrollment?.startDate!).toLocaleDateString(
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
        {payment.status === EnrollmentConfirmationState.FULLY_PAID && (
          <div className="flex w-full flex-col gap-3">
            <Card className="text-md flex w-full flex-col gap-5 space-y-1 border-none p-3 shadow-none">
              <CardHeader className="flex w-full">
                <h3 className="mx-auto text-xl font-bold">Deposit Summary</h3>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex justify-between font-medium text-primary">
                  <span>Deposit Paid </span>
                  <span>{formattedPrice(payment.depositAmount)}</span>
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
              </CardContent>
            </Card>
            <Card className="text-md w-full space-y-1 p-3">
              <CardHeader className="flex w-full">
                <h3 className="mx-auto text-xl font-bold">
                  Full Payment Summary
                </h3>
                <CardDescription>
                  <div className="flex flex-col justify-between text-xs text-muted-foreground">
                    <span>Full Payment Transaction ID</span>
                    <span className="truncate">
                      {payment.fullPaymentTransactionId || "—"}
                    </span>
                  </div>
                </CardDescription>
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
      </CardContent>
    </Card>
  );
};

export default EditPaymentForm;
