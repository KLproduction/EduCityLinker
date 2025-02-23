import { getFavoritesByUserIdAction } from "@/actions/favorites";
import ListingTable from "@/app/explore/_components/ListingTable";
import HeartButton from "@/components/listing/HeartButton";
import ListingSection from "@/components/listing/ListingSection";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/auth";
import { Check, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <div>
      <ListingTable data={organization || []} currentUser={user} />
    </div>
  );
};

export default FavoritePage;
