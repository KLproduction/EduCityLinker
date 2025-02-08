"use client";

import MyContainer from "@/components/Container";
import { categories } from "@/data/data";
import { ExtenderUser } from "@/next-auth";
import {
  Enrollment,
  Listing,
  Organization,
  Listing as PrismaListing,
} from "@prisma/client";

import React, { useMemo } from "react";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

type Props = {
  listing: Listing;
  organizer: Organization;
  currentUser?: ExtenderUser | null;
  enrollment?: Enrollment;
};

const ListingClient = ({
  listing,
  currentUser,
  organizer,
  enrollment,
}: Props) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <MyContainer>
      <div className="mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            location={listing.location}
            lat={listing.lat}
            lng={listing.lng}
            id={listing.id}
            currentUser={currentUser || null}
          />
        </div>
        <div className="gird-cols-1 mt-6 grid md:grid-cols-7 md:gap-10">
          <ListingInfo
            organizer={organizer!}
            category={listing.category}
            description={listing.description}
            courseLevels={listing.courseLevels}
            ageGroups={listing.ageGroups}
            durationWeeks={listing.durationWeeks}
            maxStudents={listing.maxStudents}
            location={listing.location}
            lat={listing.lat}
            lng={listing.lng}
          />
        </div>
      </div>
    </MyContainer>
  );
};

export default ListingClient;
