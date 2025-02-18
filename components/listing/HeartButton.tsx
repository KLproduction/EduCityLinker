"use client";

import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAddFavorites } from "@/hooks/listing";
import { ExtenderUser } from "@/next-auth";

type Props = {
  currentUser: ExtenderUser | null;
  id: string;
};

const HeartButton = ({ id, currentUser }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    addFavoriteMutate,
    isAddingFavorite,
    removeFavoriteMutate,
    isRemovingFavorite,
    favorites,
  } = useAddFavorites(currentUser?.id!, id);

  // Sync favorite state with data from the server
  useEffect(() => {
    if (favorites && favorites.favoriteIds) {
      const hasId = favorites.favoriteIds.includes(id);
      setIsFavorite(hasId);
    }
  }, [id, favorites]);

  const toggleHeart = () => {
    if (isAddingFavorite || isRemovingFavorite) return;

    if (isFavorite) {
      setIsFavorite(false);
      removeFavoriteMutate();
    } else {
      setIsFavorite(true);
      addFavoriteMutate();
    }
  };

  const isLoading = isAddingFavorite || isRemovingFavorite;
  const containerClasses = `relative cursor-pointer transition hover:opacity-80 ${
    isLoading ? "opacity-50 pointer-events-none" : ""
  }`;

  return (
    <div className={containerClasses} onClick={toggleHeart}>
      {isFavorite ? (
        <AiFillHeart
          size={24}
          className="absolute -right-[2px] -top-[2px] fill-red-500"
        />
      ) : (
        <AiOutlineHeart
          size={24}
          className="absolute -right-[2px] -top-[2px] fill-red-500"
        />
      )}
    </div>
  );
};

export default HeartButton;
