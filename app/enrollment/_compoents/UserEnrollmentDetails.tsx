import {
  getListingByIdAction,
  getOrganizationByOrganizationIdAction,
} from "@/actions/listing";
import { EnrollmentRequest, EnrollmentRequestState } from "@prisma/client";
import React from "react";
import UserEnrollmentDetailsSection from "./UserEnrollmentDetailsSection";
import AcceptEnrollmentModal from "@/components/modals/AcceptEnrollmentModal";
import CancelEnrollmentModal from "@/components/modals/CancelEnrollmentModal";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import FullPaymentModal from "@/components/modals/FullPaymentModal";
import EnrollmentSteps from "@/components/global/EnrollmentStep";

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

    return (
      <FullPaymentModal
        enrollment={enrollmentData}
        listing={listing!}
        organization={organization!}
        payment={enrollmentPayment!}
      />
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <UserEnrollmentDetailsSection
        enrollmentData={enrollmentData}
        organization={organization!}
        listing={listing!}
        userId={userId}
        enrollmentConfirmation={enrollmentConfirmation!}
      />

      <div className="flex w-full flex-col justify-end gap-3 md:flex-row">
        {enrollmentData.status === EnrollmentRequestState.PENDING && (
          <Button variant="default" disabled>
            Awaiting Confirmation by Center
          </Button>
        )}
        {enrollmentData.status === EnrollmentRequestState.CONFIRM_BY_CENTER && (
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
        <CancelEnrollmentModal enrollment={enrollmentData} />
      </div>
    </div>
  );
};

export default UserEnrollmentDetails;
