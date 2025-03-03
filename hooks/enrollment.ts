import { ENROLLMENT_STEPS } from "@/components/modals/CreateEnrollmentModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { enrollmentRequestSchema } from "@/schemas";
import { z } from "zod";
import { useCreateEnrollmentModal } from "./modal";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetEnrollmentRequestData } from "@/redux/slice/create-enrollmentRequestSlice";
import { createEnrollmentRequestAction } from "@/actions/create-enrollment";
import {
  getListingByIdAction,
  getOrganizationByIdAction,
} from "@/actions/listing";

export const useCreateEnrollmentRequest = (
  data: z.infer<typeof enrollmentRequestSchema>,
  listingId: string,
  setStep: (step: ENROLLMENT_STEPS) => void,
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate: createEnrollmentMutate, isPending: isCreatingEnrollment } =
    useMutation({
      mutationFn: async () => {
        const result = await createEnrollmentRequestAction(data, listingId);
        console.log(result.status);
        if (result?.status === 200) {
          return result;
        } else {
          throw new Error(result?.message || "Failed to create course");
        }
      },
      onError: (error) => {
        console.error("Mutation Error:", error);
        toast.error(error.message || "Failed to create course");
      },
      onSuccess: (data) => {
        if (data.status === 200) {
          toast.success("Course created successfully!");
          dispatch(resetEnrollmentRequestData());
          setStep(ENROLLMENT_STEPS.FINAL_MESSAGE);
        }
        toast.error(data.message);
      },
    });
  return {
    createEnrollmentMutate,
    isCreatingEnrollment,
  };
};

export const useGetOrganizationByEnrollmentModal = (organizationId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["organization", organizationId],
    queryFn: async () => {
      const result = await getOrganizationByIdAction(organizationId);
      return result;
    },
  });
  return {
    data,
    isPending,
  };
};

export const useGetListingByEnrollmentModal = (listingId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["course", listingId],
    queryFn: async () => {
      const result = await getListingByIdAction(listingId);
      return result;
    },
  });
  return {
    data,
    isPending,
  };
};
