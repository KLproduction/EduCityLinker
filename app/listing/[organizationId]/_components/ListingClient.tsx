"use client";

import MyContainer from "@/components/Container";
import { ExtenderUser } from "@/next-auth";
import {
  EnrollmentRequest,
  Listing,
  Organization,
  SocialMedia,
} from "@prisma/client";

import React, { useMemo } from "react";
import ListingHeader from "./ListingHeader";
import OrganizationInfo from "./OrganizationInfo";
import ListingSectionDropDown from "./ListingSectionDropDown";

type Props = {
  listing: Listing[];
  organizer: Organization;
  currentUser?: ExtenderUser | null;
  enrollment?: EnrollmentRequest;
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
  if (!organizer) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        No Organization Found.
      </div>
    );
  }
  return (
    <div className="flex min-h-[300vh] flex-col gap-8 overflow-hidden">
      <div>
        <ListingHeader
          organization={organizer}
          socialMedia={socialMedia || undefined}
          currentUser={currentUser || null}
        />
      </div>
      <MyContainer>
        <div className="mx-auto">
          {listing.length > 0 && (
            <div className="mt-4 space-y-4">
              <h1 className="text-2xl font-bold">Courses</h1>
              {listing.map((listing) => (
                <div key={listing.id}>
                  <ListingSectionDropDown listing={listing} />
                </div>
              ))}
            </div>
          )}
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
