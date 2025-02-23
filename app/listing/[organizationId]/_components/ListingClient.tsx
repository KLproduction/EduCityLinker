"use client";

import MyContainer from "@/components/Container";
import { ExtenderUser } from "@/next-auth";
import {
  Enrollment,
  Listing,
  Organization,
  Listing as PrismaListing,
  SocialMedia,
} from "@prisma/client";

import React, { useMemo } from "react";
import ListingInfo from "./ListingInfo";
import OrganizerGallery from "./OrganizerGallery";
import ListingHeader from "./ListingHeader";
import OrganizationInfo from "./OrganizationInfo";
import ListingSection from "@/components/listing/ListingSection";
import ListingSectionDropDown from "./ListingSectionDropDown";

type Props = {
  listing: Listing[];
  organizer: Organization;
  currentUser?: ExtenderUser | null;
  enrollment?: Enrollment;
  studentNation?: {
    nation: string;
    count: number;
  }[];
  socialMedia?: SocialMedia;
};

const ListingClient = ({
  listing,
  currentUser,
  organizer,
  enrollment,
  studentNation,
  socialMedia,
}: Props) => {
  return (
    <div className="flex min-h-[300vh] flex-col gap-8 overflow-hidden">
      <div>
        <ListingHeader organization={organizer} socialMedia={socialMedia} />
      </div>
      <MyContainer>
        <div className="mx-auto">
          <div className="mt-4 space-y-4">
            <h1 className="text-2xl font-bold">Courses</h1>
            {listing.map((listing) => (
              <div key={listing.id}>
                <ListingSectionDropDown listing={listing} />
              </div>
            ))}
          </div>
          <OrganizationInfo
            organization={organizer}
            studentNation={studentNation}
          />
        </div>
      </MyContainer>
    </div>
  );
};

export default ListingClient;

{
  /* <div className="flex flex-col gap-6">
  <OrganizerGallery title={organizer.name} organizer={organizer} />
</div> */
}
