"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const addFavoriteAction = async (listingId: string) => {
  const user = await currentUser();
  if (!user) {
    return {
      status: 404,
      message: "User not found, please log in to continue.",
    };
  }
  if (!listingId || typeof listingId !== "string") {
    return {
      status: 400,
      message: "Invalid listing ID",
    };
  }
  const userFavoritesResponse = await getFavoritesAction(user?.id!);
  const userFavoriteIds = userFavoritesResponse?.favoriteIds;

  if (userFavoriteIds?.includes(listingId)) return;

  const favorite = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds: {
        push: listingId,
      },
    },
  });

  if (favorite) {
    return {
      status: 200,
      message: "Added to favorites",
      favoriteId: favorite.id,
    };
  }
  return {
    status: 401,
    message: "Failed to add to favorites",
  };
};
try {
} catch (e) {
  console.error(e);
}

export const removeFavoriteAction = async (listingId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 404,
        message: "User not found, please log in.",
      };
    }
    if (!listingId || typeof listingId !== "string") {
      return {
        status: 400,
        message: "Invalid listing ID",
      };
    }

    const userFavoritesResponse = await getFavoritesAction(user?.id!);
    const userFavoriteIds = userFavoritesResponse?.favoriteIds;

    if (!userFavoriteIds) {
      return {
        status: 404,
        message: "User favorites not found.",
      };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        favoriteIds: userFavoriteIds.filter((id) => id !== listingId),
      },
    });
    return {
      status: 200,
      message: "Removed from favorites",
    };
  } catch (e) {
    console.error(e);
  }
};

export const getFavoritesAction = async (userId: string) => {
  try {
    const userData = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favoriteIds: true,
      },
    });

    if (!userData || !userData.favoriteIds) {
      return {
        status: 404,
        message: "User favorites not found.",
      };
    }

    return { status: 200, favoriteIds: userData?.favoriteIds };
  } catch (e) {
    console.error(e);
  }
};
