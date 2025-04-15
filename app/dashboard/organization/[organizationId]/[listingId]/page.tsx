import { getOrganizationByIdAction } from "@/actions/create-organization";
import {
  getListingByIdAction,
  getListingByOrganizationIdAction,
  getSocialMediaByOrganizationIdAction,
  getStudentNationByOrganizationIdAction,
} from "@/actions/listing";

import { currentUser } from "@/lib/auth";

import { redirect } from "next/navigation";
import { EditCourseForm } from "./_components/EditListingForm";

type Props = {
  params: { listingId: string };
};

const DashboardListingPage = async ({ params }: Props) => {
  const user = await currentUser();
  if (!user || (user.role !== "ORGANIZER" && user.role !== "ADMIN")) {
    redirect("/");
  }
  if (!params.listingId) {
    redirect("/dashboard");
  }

  const listingData = await getListingByIdAction(params.listingId);
  const listing = listingData?.listing;
  if (!listing) {
    return (
      <div className="flex h-full w-full items-center justify-center text-4xl">
        Listing not found
      </div>
    );
  }

  return (
    <div className="lg:min-w-7xl mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:px-8 lg:py-16">
      <EditCourseForm courseData={listing} />
    </div>
  );
};

export default DashboardListingPage;
