import ClientOnly from "@/components/auth/global/ClientOnly";
import EmptyState from "./_components/EmptyState";
import { getListingsAction } from "@/actions/listing";
import MyContainer from "@/components/Container";

import ListingCard from "@/components/listing/ListingCard";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const ExplorePage = async () => {
  const data = await getListingsAction();
  const user = await currentUser();

  if (data?.status !== 200) {
    return <div>No Listing Found</div>;
  }

  const { listings } = data;

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MyContainer>
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listings?.map((listing: any) => {
            return (
              <div className="" key={listing.id}>
                <ListingCard
                  data={listing}
                  currentUser={user}
                  // onAction={onClick}
                  actionLabel="View"
                  actionId={listing.id}
                />
              </div>
            );
          })}
        </div>
      </MyContainer>
    </ClientOnly>
  );
};

export default ExplorePage;
