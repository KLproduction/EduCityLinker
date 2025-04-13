import {
  adminAddDummyEnrollmentRequest,
  adminDeleteAllEnrollmentRequests,
  adminDeleteAllListings,
  adminDeleteDummyEnrollmentRequests,
} from "@/actions/admin";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSuperAdmin = () => {
  const { mutate: deleteListings, isPending: isDeletePending } = useMutation({
    mutationFn: async () => {
      const result = await adminDeleteAllListings();
      console.log(result?.status);
      return result;
    },
    onError: (error) => console.error(error.message),
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data?.message);
      }
    },
  });
  const {
    mutate: deleteEnrollmentRequests,
    isPending: isDeleteEnrollmentPending,
  } = useMutation({
    mutationFn: async () => {
      const result = await adminDeleteAllEnrollmentRequests();
      return result;
    },
    onError: (error) => console.error(error.message),
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data?.message);
      }
    },
  });

  return {
    deleteListings,
    isDeletePending,
    deleteEnrollmentRequests,
    isDeleteEnrollmentPending,
  };
};

export const useAdminAddDummyEnrollmentRequests = () => {
  const {
    mutate: addDummyEnrollmentRequests,
    isPending: isAddingDummyPending,
  } = useMutation({
    mutationFn: async (count: number) => {
      const response = await adminAddDummyEnrollmentRequest();

      if (response?.status !== 200) {
        throw new Error("Failed to add dummy enrollment requests");
      }

      return response;
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.message || "Failed to add dummy enrollment requests");
    },
    onSuccess: (data) => {
      toast.success(
        data?.message || "Dummy enrollment requests added successfully!",
      );
    },
  });

  return { addDummyEnrollmentRequests, isAddingDummyPending };
};

export const useAdminDeleteDummyEnrollmentRequests = () => {
  const {
    mutate: deleteDummyEnrollmentRequests,
    isPending: isDeletingDummyEnrollment,
  } = useMutation({
    mutationFn: async () => {
      const response = await adminDeleteDummyEnrollmentRequests();

      if (response?.status !== 200) {
        throw new Error("Failed to delete dummy enrollment requests");
      }

      return response;
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(
        error.message || "Failed to delete dummy enrollment requests",
      );
    },
    onSuccess: (data) => {
      toast.success(
        data?.message || "Dummy enrollment requests deleted successfully!",
      );
    },
  });

  return { deleteDummyEnrollmentRequests, isDeletingDummyEnrollment };
};
