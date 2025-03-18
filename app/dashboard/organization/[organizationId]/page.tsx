import { getOrganizationByIdAction } from "@/actions/create-organization";
import {
  getListingByOrganizationIdAction,
  getSocialMediaByOrganizationIdAction,
  getStudentNationByOrganizationIdAction,
} from "@/actions/listing";
import ListingClient from "@/app/listing/[organizationId]/_components/ListingClient";
import ClientOnly from "@/components/global/ClientOnly";
import AccommodationModal from "@/components/modals/AccommodationModal";
import { currentUser } from "@/lib/auth";
import EditOrganizationForm from "../../_components/EditOrganizationForm";

type Props = {
  params: { organizationId: string };
};

const DashboardOrganizationPage = async ({ params }: Props) => {
  const user = await currentUser();
  const organizer = await getOrganizationByIdAction(params.organizationId);
  const listingData = await getListingByOrganizationIdAction(
    params.organizationId,
  );
  const studentNationsData = await getStudentNationByOrganizationIdAction(
    params.organizationId,
  );
  const socialMediaData = await getSocialMediaByOrganizationIdAction(
    params.organizationId,
  );

  const listing = listingData?.listing;
  const studentNations = studentNationsData?.studentNations;
  const socialMedia = socialMediaData?.socialMedia;

  return (
    <div className="lg:min-w-7xl mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:px-8 lg:py-16">
      {/* <ClientOnly>
        <ListingClient
          listing={listing!}
          organizer={organizer!}
          currentUser={user}
          studentNation={studentNations}
          socialMedia={socialMedia}
        />
        <AccommodationModal organization={organizer!} />
      </ClientOnly> */}
      <EditOrganizationForm organizationData={organizer!} />
    </div>
  );
};

export default DashboardOrganizationPage;
