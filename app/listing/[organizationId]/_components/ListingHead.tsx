"use client";

import HeartButton from "@/components/listing/HeartButton";
import { ExtenderUser } from "@/next-auth";
import { Organization } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ListingGallery from "./ListingGallery";

type Props = {
  id: string;
  title: string;
  currentUser?: ExtenderUser | null;
  organizer: Organization;
};

const ListingHead = ({ id, title, currentUser, organizer }: Props) => {
  const coverPhotoSrc = `${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${organizer.coverPhoto}/-/preview/600x600/`;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col justify-start">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mb-3 text-xl font-medium text-zinc-600">
          {organizer.location}
        </p>
      </div>
      <ListingGallery
        coverPhoto={organizer.coverPhoto!}
        gallery={organizer.gallery}
      />

      {/* <div className="absolute right-3 top-3">
          <HeartButton id={id} currentUser={currentUser || null} />
        </div> */}
    </div>
  );
};

export default ListingHead;
