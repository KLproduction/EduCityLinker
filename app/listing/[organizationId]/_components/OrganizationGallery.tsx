"use client";

import HeartButton from "@/components/listing/HeartButton";
import { ExtenderUser } from "@/next-auth";
import { Organization } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ListingGallery from "./ListingGallery";

type Props = {
  title?: string;
  organizer: Organization;
};

const OrganizationGallery = ({ title, organizer }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {title && (
        <h1 className="my-3 flex w-full justify-start text-3xl font-semibold">
          {title}
        </h1>
      )}
      <ListingGallery gallery={organizer.gallery} />
    </div>
  );
};

export default OrganizationGallery;
