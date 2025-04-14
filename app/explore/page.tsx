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
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:min-w-[1000px]">
        No Listing Found
      </div>
    );
  }

  if (data.status === 200) {
    return (
      <MyContainer>
        <ListingTable data={data.organization || []} currentUser={user} />
      </MyContainer>
    );
  }
};

export default ExplorePage;
