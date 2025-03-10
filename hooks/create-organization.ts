import { onCreateOrganizationAction } from "@/actions/create-organization";
import { deleteUploadcare, uploadImage } from "@/actions/uploadImage";
import {
  appendToGallery,
  resetOrganizationData,
  setOrganizationData,
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";
import {
  createOrganizerSchema,
  nationalitySchema,
  socialMediaSchema,
} from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateOrganizerModal } from "./modal";
import { STEPS } from "@/components/modals/CreateOrganizerModal";
import { useRouter } from "next/navigation";
import { appendToAmenityGallery } from "@/redux/slice/create-organizationSlice";
import { resetStudentNationData } from "@/redux/slice/create-organizationNationSlice";
import { resetSocialMediaData } from "@/redux/slice/create-organizationSocialMediaSlice";

export const useUploadLogo = () => {
  const dispatch = useAppDispatch();
  const organizationData = useAppSelector((state) => state.organization);
  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: async (fileData: File) => {
      const result = await uploadImage(fileData);
      return result.uuid;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      dispatch(setOrganizationData({ logo: data }));

      toast.success("Image uploaded successfully!");
    },
  });

  return {
    uploadImageMutate,
    isPending,
  };
};
export const useCoverPhotoLogo = () => {
  const dispatch = useAppDispatch();
  const organizationData = useAppSelector((state) => state.organization);
  const { mutate: uploadCoverPhotoMutate, isPending } = useMutation({
    mutationFn: async (fileData: File) => {
      const result = await uploadImage(fileData);
      return result.uuid;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      dispatch(setOrganizationData({ coverPhoto: data }));
      toast.success("Image uploaded successfully!");
    },
  });

  return {
    uploadCoverPhotoMutate,
    isPending,
  };
};
export const useUploadGallery = () => {
  const dispatch = useAppDispatch();
  const organizationData = useAppSelector((state) => state.organization);
  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: async (fileData: File) => {
      const result = await uploadImage(fileData);
      return result.uuid;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      dispatch(appendToGallery(data));
      toast.success("Image uploaded successfully!");
    },
  });

  return {
    uploadImageMutate,
    isPending,
  };
};
export const useUploadRoomGallery = () => {
  const dispatch = useAppDispatch();
  const organizationData = useAppSelector((state) => state.organization);
  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: async (fileData: File) => {
      const result = await uploadImage(fileData);
      return result.uuid;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      dispatch(appendToAmenityGallery(data));
      toast.success("Image uploaded successfully!");
    },
  });

  return {
    uploadImageMutate,
    isPending,
  };
};

export const useDeleteUploadcare = () => {
  const { mutate: deleteUploadcareMutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteUploadcare(id);
      return result.originalFileUrl;
    },
    onError: (error) => console.error(error.message),
    onSuccess: (data) => {
      toast.success("Image deleted successfully!");
    },
  });

  const onDeleteUploadcare = (id: string) => {
    deleteUploadcareMutate(id);
  };

  return {
    onDeleteUploadcare,
    isPending,
  };
};

type useCreateOrganizationProps = {
  setStep: (step: STEPS) => void;
};

export const useCreateOrganization = ({
  setStep,
}: useCreateOrganizationProps) => {
  const { close } = useCreateOrganizerModal();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate: createOrganizationMutate, isPending } = useMutation({
    mutationFn: async ({
      organizationData,
      studentNationData,
      socialMediaData,
    }: {
      organizationData: z.infer<typeof createOrganizerSchema>;
      studentNationData: z.infer<typeof nationalitySchema>[] | [];
      socialMediaData: z.infer<typeof socialMediaSchema>;
    }) => {
      const result = await onCreateOrganizationAction(
        organizationData,
        studentNationData,
        socialMediaData,
      );
      return result;
    },
    onError: (error) => console.error(error.message),
    onSuccess: (data) => {
      if (data?.status === 200) {
        dispatch(resetOrganizationData());
        dispatch(resetStudentNationData());
        dispatch(resetSocialMediaData());
        setStep(STEPS.DESCRIPTION);
        close();
        router.refresh();

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });

  return {
    createOrganizationMutate,
    isPending,
  };
};
