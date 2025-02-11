"use client";

import { getFavoritesAction } from "@/actions/favorites";
import { useAddFavorites } from "@/hooks/listing";
import { ExtenderUser } from "@/next-auth";
import { useEffect, useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  currentUser: ExtenderUser | null;
  id: string;
};

const HeartButton = ({ id, currentUser }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {};

  const {
    addFavoriteMutate,
    isAddingFavorite,
    removeFavoriteMutate,
    isRemovingFavorite,
    favorites,
  } = useAddFavorites(currentUser?.id!, id);

  useEffect(() => {
    if (favorites && favorites.favoriteIds) {
      const hasId = favorites?.favoriteIds?.includes(id) || false;
      setIsFavorite(hasId);
    }
  }, [id, favorites]);

  return (
    <div className="relative cursor-pointer transition hover:opacity-80">
      {isFavorite ? (
        <AiFillHeart
          onClick={() => removeFavoriteMutate()}
          size={24}
          className={"absolute -right-[2px] -top-[2px] fill-red-500"}
        />
      ) : (
        <AiOutlineHeart
          onClick={() => addFavoriteMutate()}
          size={24}
          className="absolute -right-[2px] -top-[2px] fill-red-500"
        />
      )}
    </div>
  );
};

export default HeartButton;
