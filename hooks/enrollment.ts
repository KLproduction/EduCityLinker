import { ENROLLMENT_STEPS } from "@/components/modals/CreateEnrollmentModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  editEnrollmentRequestSchema,
  enrollmentRequestSchema,
} from "@/schemas";
import { z } from "zod";
import { useCreateEnrollmentModal } from "./modal";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetEnrollmentRequestData } from "@/redux/slice/create-enrollmentRequestSlice";
import {
  createEnrollmentRequestAction,
  onCancelEnrollmentRequestAction,
  onConfirmEnrollmentRequestAction,
  onDeleteEnrollmentRequestAction,
  onRequestCancelEnrollmentRequestAction,
  onUpdateEnrollmentRequestAction,
} from "@/actions/create-enrollment";
import {
  getListingByIdAction,
  getOrganizationByIdAction,
} from "@/actions/listing";
import { EnrollmentRequest, EnrollmentRequestState } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

type EditEnrollmentProps = {
  enrollment: EnrollmentRequest;
  setIsEditable?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const useEditEnrollment = ({
  enrollment,
  setIsEditable,
}: EditEnrollmentProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    watch,
    reset,
    setValue,
  } = useForm<z.infer<typeof editEnrollmentRequestSchema>>({
    resolver: zodResolver(editEnrollmentRequestSchema),
    defaultValues: {
      ...enrollment,
      centerConfirmed: enrollment.centerConfirmed ?? false,
      centerConfirmationDate: enrollment.centerConfirmationDate ?? null,
      status: enrollment.status ?? "PENDING",
    },
  });

  const { mutate: updateEnrollmentMutate, isPending: isUpdatingEnrollment } =
    useMutation({
      mutationFn: async ({
        enrollmentId,
        data,
      }: {
        enrollmentId: string;
        data: z.infer<typeof editEnrollmentRequestSchema>;
      }) => {
        const result = await onUpdateEnrollmentRequestAction(enrollmentId, {
          ...data,
          centerConfirmationDate: data.centerConfirmationDate ?? null,
        });

        return result;
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message || "Failed to update enrollment");
      },
      onSuccess: (data) => {
        if (data.status === 200) {
          toast.success("Enrollment updated successfully!");
          if (setIsEditable) setIsEditable(false);

          router.refresh();
        } else {
          toast.error(data.message);
        }
      },
    });

  const onSubmit = handleSubmit(async (data) => {
    updateEnrollmentMutate({ enrollmentId: enrollment.id, data });
  });

  const resetForm = () => {
    reset();
  };

  return {
    register,
    handleSubmit: onSubmit,
    errors,
    isSubmitting,
    watch,
    getValues,
    setValue,
    reset,
    onSubmit,
    isUpdatingEnrollment,
    resetForm,
  };
};

export const useAcceptEnrollment = () => {
  const { mutate: acceptEnrollmentMutate, isPending: isAcceptingEnrollment } =
    useMutation({});
  return {
    acceptEnrollmentMutate,
    isAcceptingEnrollment,
  };
};

export const useEnrollmentConfirmation = () => {
  const { mutate: confirmEnrollmentMutate, isPending: isConfirmingEnrollment } =
    useMutation({
      mutationFn: async (enrollmentId: string) => {
        const result = await onConfirmEnrollmentRequestAction(enrollmentId);
        return result;
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message || "Failed to confirm enrollment");
      },
    });
  return {
    confirmEnrollmentMutate,
    isConfirmingEnrollment,
  };
};

export const useDeleteEnrollment = () => {
  const router = useRouter();
  const { mutate: deleteEnrollmentMutate, isPending: isDeletingEnrollment } =
    useMutation({
      mutationFn: async (enrollmentId: string) => {
        const result = await onDeleteEnrollmentRequestAction(enrollmentId);
        return result.status;
      },
      onError: (error) => console.error(error.message),
      onSuccess: (data) => {
        if (data === 200) {
          toast.success("Enrollment deleted successfully!");
          close();
          router.refresh();
        } else {
          toast.error("Error deleting enrollment!");
        }
      },
    });

  return {
    deleteEnrollmentMutate,
    isDeletingEnrollment,
  };
};
export const useCancelEnrollment = () => {
  const router = useRouter();
  const { mutate: cancelEnrollmentMutate, isPending: isCancellingEnrollment } =
    useMutation({
      mutationFn: async (enrollmentId: string) => {
        const result = await onCancelEnrollmentRequestAction(enrollmentId);
        return result.status;
      },
      onError: (error) => console.error(error.message),
      onSuccess: (data) => {
        if (data === 200) {
          toast.success("Enrollment deleted successfully!");
          close();
          router.refresh();
        } else {
          toast.error("Error deleting enrollment!");
        }
      },
    });

  return {
    cancelEnrollmentMutate,
    isCancellingEnrollment,
  };
};
export const useRequestCancelEnrollment = () => {
  const router = useRouter();
  const {
    mutate: requestCancelEnrollmentMutate,
    isPending: isRequestCancellingEnrollment,
  } = useMutation({
    mutationFn: async ({
      enrollmentId,
      reason,
    }: {
      enrollmentId: string;
      reason?: string;
    }) => {
      const result = await onRequestCancelEnrollmentRequestAction(
        enrollmentId,
        reason,
      );
      return result.status;
    },
    onError: (error) => console.error(error.message),
    onSuccess: (data) => {
      if (data === 200) {
        toast.success("Enrollment cancel request sent successfully!");
        close();
        router.refresh();
      } else {
        toast.error("Error deleting enrollment!");
      }
    },
  });

  return {
    requestCancelEnrollmentMutate,
    isRequestCancellingEnrollment,
  };
};

export const useGetOrganizationByCancellationId = (cancellationId: string) => {
  const { data: organization } = useQuery({
    queryKey: ["organization", cancellationId],
    queryFn: async () => {
      const result = await getOrganizationByIdAction(cancellationId);
      return result?.organization;
    },
  });
  return {
    organization,
  };
};
