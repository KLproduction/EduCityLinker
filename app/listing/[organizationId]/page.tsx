import {
  getListingByIdAction,
  getOrganizationByIdAction,
  getSocialMediaByOrganizationIdAction,
  getStudentNationByOrganizationIdAction,
} from "@/actions/listing";
import EmptyState from "@/app/explore/_components/EmptyState";
import ClientOnly from "@/components/global/ClientOnly";
import { currentUser } from "@/lib/auth";
import React from "react";
import ListingClient from "./_components/ListingClient";

type Props = {
  params: {
    organizationId: string;
  };
};

const ListingPage = async ({ params }: Props) => {
  const data = await getOrganizationByIdAction(params.organizationId);
  const user = await currentUser();
  const studentNation = await getStudentNationByOrganizationIdAction(
    params.organizationId,
  );
  const socialMediaData = await getSocialMediaByOrganizationIdAction(
    params.organizationId,
  );

  if (data?.status !== 200) {
    <ClientOnly>
      <EmptyState />
    </ClientOnly>;
  }

  const listing = data?.organization?.listings;
  const organizer = data?.organization;
  const studentNations = studentNation?.studentNations;
  const socialMedia = socialMediaData?.socialMedia;

  return (
    <ClientOnly>
      <ListingClient
        listing={listing!}
        organizer={organizer!}
        currentUser={user}
        studentNation={studentNations}
        socialMedia={socialMedia}
      />
    </ClientOnly>
  );
};

export default ListingPage;
