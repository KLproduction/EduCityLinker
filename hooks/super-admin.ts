import {
  adminDeleteAllEnrollmentRequests,
  adminDeleteAllListings,
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
