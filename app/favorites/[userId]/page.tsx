import { getFavoritesByUserIdAction } from "@/actions/favorites";
import ListingTable from "@/app/explore/_components/ListingTable";
import BackToExploreBtn from "@/components/global/BackToExploreBtn";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  params: { userId: string };
};

const FavoritePage = async ({ params }: Props) => {
  const favorites = await getFavoritesByUserIdAction(params.userId);
  if (
    !favorites?.favoriteOrganizations ||
    !favorites?.favoriteOrganizations.length
  )
    <div className="flex h-full w-full flex-col items-center justify-center">
      No Favorites saved.
    </div>;

  const user = await currentUser();

  if (!user) {
    redirect("/explore");
  }

  const organization = favorites?.favoriteOrganizations
    ?.filter((item) => item.status === 200)
    ?.map((item) => item.organization)
    ?.filter((org): org is NonNullable<typeof org> => org !== undefined);

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-start">
        <BackToExploreBtn variant="outline" />
      </div>
      <ListingTable data={organization || []} currentUser={user} />
    </div>
  );
};

export default FavoritePage;
