import ClientOnly from "@/components/global/ClientOnly";
import { getOrganizationWithListingAction } from "@/actions/listing";
import { currentUser } from "@/lib/auth";

import ListingTable from "./_components/ListingTable";
import MyContainer from "@/components/Container";
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
        <MyContainer>
          <ListingTable data={data.organization || []} currentUser={user} />
        </MyContainer>
      </ClientOnly>
    );
  }
};

export default ExplorePage;
