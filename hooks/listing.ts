import {
  addFavoriteAction,
  getFavoritesAction,
  removeFavoriteAction,
} from "@/actions/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { useLoginModal } from "./modal";
import { getOrganizationByListingIdAction } from "@/actions/listing";

export const useAddFavorites = (userId: string, listingId: string) => {
  const { open } = useLoginModal();
  const queryClient = useQueryClient();

  const { data: favorites } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => await getFavoritesAction(userId),
  });
  const { mutate: addFavoriteMutate, isPending: isAddingFavorite } =
    useMutation({
      mutationFn: async () => {
        const result = await addFavoriteAction(listingId);
        if (result?.status === 404) {
          open();
        }
        return result;
      },
      onError: (error) => {
        console.error("Mutation Error:", error);
        toast.error(error.message);
      },
      onSuccess: (data) => {
        console.log("Mutation Success Data:", data);
        if (data?.message) {
          toast.success(data.message);
        }
        queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
      },
    });

  const { mutate: removeFavoriteMutate, isPending: isRemovingFavorite } =
    useMutation({
      mutationFn: async () => {
        const result = await removeFavoriteAction(listingId);
        return result;
      },
      onError: (error) => {
        console.error("Mutation Error:", error);
        toast.error(error.message);
      },
      onSuccess: (data) => {
        console.log("Mutation Success Data:", data);
        toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
      },
    });

  return {
    addFavoriteMutate,
    isAddingFavorite,
    removeFavoriteMutate,
    isRemovingFavorite,
    favorites,
  };
};

export const useGetOrganizationByListingId = (listingId: string) => {
  const { data } = useQuery({
    queryKey: ["organization", listingId],
    queryFn: async () => await getOrganizationByListingIdAction(listingId),
  });
  const organization = data?.organization;
  return {
    organization,
  };
};
