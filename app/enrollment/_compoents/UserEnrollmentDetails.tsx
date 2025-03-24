import {
  getListingByIdAction,
  getOrganizationByListingIdAction,
} from "@/actions/listing";
import { EnrollmentRequest } from "@prisma/client";
import React from "react";
import UserEnrollmentDetailsSection from "./UserEnrollmentDetailsSection";

type Props = {
  enrollmentData: EnrollmentRequest;
  userId: string;
};

const UserEnrollmentDetails = async ({ enrollmentData, userId }: Props) => {
  const organizationData = await getOrganizationByListingIdAction(
    enrollmentData.organizationId,
  );
  const listingData = await getListingByIdAction(enrollmentData.listingId);

  const organization = organizationData?.organization;
  const listing = listingData?.listing;

  return (
    <div>
      <UserEnrollmentDetailsSection
        enrollmentData={enrollmentData}
        organization={organization!}
        listing={listing!}
        userId={userId}
      />
    </div>
  );
};

export default UserEnrollmentDetails;
