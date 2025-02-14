import { Organization } from "@prisma/client";
import React from "react";

type Props = {
  organization: Organization;
};

const ListingHeader = ({ organization }: Props) => {
  return (
    <div className="relative h-[500px] w-screen">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${organization.coverPhoto}/-/preview/1280x600/`}
          className="h-full w-full object-cover object-center brightness-50"
        />
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-4xl font-bold text-zinc-50 md:text-8xl">
          {organization.name}
        </h1>
      </div>
    </div>
  );
};

export default ListingHeader;
