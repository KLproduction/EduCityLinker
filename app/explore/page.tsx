import ClientOnly from "@/components/auth/global/ClientOnly";
import EmptyState from "./_components/EmptyState";
import {
  getListingsAction,
  getOrganizationWithListingAction,
} from "@/actions/listing";
import MyContainer from "@/components/Container";

import ListingCard from "@/components/listing/ListingCard";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { deleteAllListingSuperAdminAction } from "@/actions/createCourse";
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
