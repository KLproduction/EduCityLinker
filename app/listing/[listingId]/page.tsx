import { getListingByIdAction } from "@/actions/listing";
import EmptyState from "@/app/explore/_components/EmptyState";
import ClientOnly from "@/components/auth/global/ClientOnly";
import { currentUser } from "@/lib/auth";
import React from "react";
import ListingClient from "./_components/ListingClient";

type Props = {
  params: {
    listingId: string;
  };
};

const ListingPage = async ({ params }: Props) => {
  const data = await getListingByIdAction(params.listingId);
  const user = await currentUser();

  if (data?.status !== 200) {
    <ClientOnly>
      <EmptyState />
    </ClientOnly>;
  }

  const listing = data?.listing;
  const organizer = listing?.organization;

  return (
    <ClientOnly>
      <ListingClient
        listing={listing!}
        organizer={organizer!}
        currentUser={user}
      />
    </ClientOnly>
  );
};

export default ListingPage;
