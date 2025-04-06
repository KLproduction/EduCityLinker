import {
  getListingByIdAction,
  getOrganizationByOrganizationIdAction,
} from "@/actions/listing";
import {
  EnrollmentConfirmationState,
  EnrollmentRequest,
  EnrollmentRequestState,
} from "@prisma/client";
import React from "react";
import UserEnrollmentDetailsSection from "./UserEnrollmentDetailsSection";
import AcceptEnrollmentModal from "@/components/modals/AcceptEnrollmentModal";
import CancelEnrollmentModal from "@/components/modals/CancelEnrollmentModal";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import FullPaymentModal from "@/components/modals/FullPaymentModal";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formattedPrice } from "@/lib/formatPrice";
import { Separator } from "@/components/ui/separator";

type Props = {
  enrollmentData: EnrollmentRequest;
  userId: string;
};

const UserEnrollmentDetails = async ({ enrollmentData, userId }: Props) => {
  const organizationData = await getOrganizationByOrganizationIdAction(
    enrollmentData.organizationId,
  );
  const listingData = await getListingByIdAction(enrollmentData.listingId);
  const organization = organizationData?.organization;
  const listing = listingData?.listing;
  const enrollmentConfirmation = await db.enrollmentConfirmation.findFirst({
    where: {
      requestId: enrollmentData.id,
    },
  });

  const FullPaymentSection = async () => {
    const enrollmentPayment = await db.enrollmentPayment.findFirst({
      where: {
        confirmationId: enrollmentConfirmation?.id,
      },
    });
    if (!enrollmentPayment) {
      return;
    }
    if (
      enrollmentPayment.status === EnrollmentConfirmationState.FULLY_PAID ||
      enrollmentPayment.status ===
        EnrollmentConfirmationState.CANCELLED_REFUNDED ||
      enrollmentPayment.status === EnrollmentConfirmationState.CANCELLED ||
      enrollmentPayment.status ===
        EnrollmentConfirmationState.CANCELLATION_REQUESTED
    )
      return;
    return (
      <FullPaymentModal
        enrollment={enrollmentData}
        listing={listing!}
        organization={organization!}
        payment={enrollmentPayment!}
      />
    );
  };
  const CancelSection = async () => {
    const enrollmentPayment = await db.enrollmentPayment.findFirst({
      where: {
        confirmationId: enrollmentConfirmation?.id,
      },
    });

    if (
      enrollmentData?.status === EnrollmentConfirmationState.CANCELLED ||
      enrollmentData?.status === EnrollmentConfirmationState.CANCELLED_REFUNDED
    )
      return;
    return (
      <CancelEnrollmentModal
        enrollment={enrollmentData}
        payment={enrollmentPayment!}
      />
    );
  };

  const PaymentDetails = async () => {
    const enrollmentPayment = await db.enrollmentPayment.findFirst({
      where: {
        confirmationId: enrollmentConfirmation?.id,
      },
    });
    if (!enrollmentPayment) {
      return;
    }

    const courseStart = new Date(enrollmentData.startDate);
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
                  {new Date(enrollmentData.startDate).toLocaleDateString(
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
    <Card className="flex flex-col gap-3">
      <CardContent>
        <UserEnrollmentDetailsSection
          enrollmentData={enrollmentData}
          organization={organization!}
          listing={listing!}
          userId={userId}
          enrollmentConfirmation={enrollmentConfirmation!}
        />
        {await PaymentDetails()}
      </CardContent>
      <CardFooter className="flex w-full flex-col justify-end gap-3 md:flex-row">
        <div className="flex w-full flex-col justify-end gap-3 md:flex-row">
          {enrollmentData.status === EnrollmentRequestState.PENDING && (
            <Button variant="default" disabled>
              Awaiting Confirmation by Center
            </Button>
          )}
          {enrollmentData.status ===
            EnrollmentRequestState.CONFIRM_BY_CENTER && (
            <AcceptEnrollmentModal
              enrollment={enrollmentData}
              organization={organization!}
              listing={listing!}
              userId={userId}
            />
          )}
          {enrollmentData.status === EnrollmentRequestState.CONFIRM_BY_USER && (
            <FullPaymentSection />
          )}
          <CancelSection />
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserEnrollmentDetails;
