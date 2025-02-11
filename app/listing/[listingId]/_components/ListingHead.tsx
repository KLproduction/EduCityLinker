"use client";

import HeartButton from "@/components/listing/HeartButton";
import { ExtenderUser } from "@/next-auth";
import { Organization } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  id: string;
  title: string;
  currentUser?: ExtenderUser | null;
  organizer: Organization;
};

const ListingHead = ({ id, title, currentUser, organizer }: Props) => {
  return (
    <div className="over w-full">
      <h1 className="font-bold">{title}</h1>
      <p className="mb-3 text-sm font-medium text-zinc-600">
        {organizer.location}
      </p>
      <div className="relative mx-auto h-[60vh] w-full overflow-hidden rounded-xl">
        {organizer.logo && (
          <Image
            src={`${organizer.logo}-/scale_crop/600x600/`}
            alt="listing"
            fill
            className="object-cover transition duration-300 group-hover:scale-110"
          />
        )}
        <div className="absolute right-3 top-3">
          <HeartButton id={id} currentUser={currentUser || null} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
