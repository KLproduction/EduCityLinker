import {
  getListingByIdAction,
  getOrganizationByListingIdAction,
} from "@/actions/listing";
import ListingSection from "@/components/listing/ListingSection";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useGetListingById,
  useGetOrganizationByListingId,
} from "@/hooks/listing";
import { formattedPrice } from "@/lib/formatPrice";
import { EnrollmentRequest, Listing, Organization } from "@prisma/client";
import { format } from "date-fns";
import { Check, InfoIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import UserEnrollmentDetailsSection from "./UserEnrollmentDetailsSection";

// type Props = {
//   enrollmentData: EnrollmentRequest;
// };
type Props = {
  enrollmentData: EnrollmentRequest;
};

const UserEnrollmentDetails = async ({ enrollmentData }: Props) => {
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
      />
    </div>
  );
};

export default UserEnrollmentDetails;
