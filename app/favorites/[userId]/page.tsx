import { getFavoritesByUserIdAction } from "@/actions/favorites";

type Props = {
  params: { userId: string };
};

const FavoritePage = async ({ params }: Props) => {
  const favorites = await getFavoritesByUserIdAction(params.userId);
  console.log(favorites);
  return <div>page</div>;
};

export default FavoritePage;
