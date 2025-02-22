import ClientOnly from "@/components/global/ClientOnly";
import { getOrganizationWithListingAction } from "@/actions/listing";
import { currentUser } from "@/lib/auth";

import ListingTable from "./_components/ListingTable";
// organization: (Organization & { listings: Listing[] })[];
const ExplorePage = async () => {
  const data = await getOrganizationWithListingAction();
  const user = await currentUser();

  if (data?.status !== 200) {
    return <div>No Listing Found</div>;
  }

  if (data.status === 200) {
    return (
      <ClientOnly>
        <div>
          <ListingTable data={data.organization || []} currentUser={user} />
        </div>
      </ClientOnly>
    );
  }
};

export default ExplorePage;
