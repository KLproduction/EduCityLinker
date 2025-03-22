import {
  addFavoriteAction,
  getFavoritesAction,
  removeFavoriteAction,
} from "@/actions/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { useLoginModal } from "./modal";
import {
  getListingByIdAction,
  getOrganizationByListingIdAction,
} from "@/actions/listing";

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

export const useGetOrganizationByListingId = (organizationId: string) => {
  if (!organizationId) return;
  const { data, isPending, isLoading } = useQuery({
    queryKey: ["organization", organizationId],
    queryFn: async () => {
      return await getOrganizationByListingIdAction(organizationId);
    },
  });
  if (data?.status !== 200) {
    console.log(data?.message);
  }
  const organization = data?.organization;
  return {
    organization,
    isPending,
    isLoading,
  };
};

export const useGetListingById = (listingId: string) => {
  const { data, isPending, isLoading } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: async () => await getListingByIdAction(listingId),
  });
  const listing = data?.listing;
  return {
    listing,
    isPending,
    isLoading,
  };
};
