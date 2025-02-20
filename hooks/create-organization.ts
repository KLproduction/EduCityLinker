import { onCreateOrganizationAction } from "@/actions/create-organization";
import { deleteUploadcare, uploadImage } from "@/actions/uploadImage";
import {
  appendToGallery,
  resetOrganizationData,
  setOrganizationData,
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";
import { createOrganizerSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateOrganizerModal } from "./modal";
import { STEPS } from "@/components/modals/CreateOrganizerModal";
import { useRouter } from "next/navigation";
import { appendToAmenityGallery } from "@/redux/slice/create-organizationSlice";

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
      console.log(organizationData);
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
      console.log(organizationData);
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
      console.log(data), toast.success("Image deleted successfully!");
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
    mutationFn: async (data: z.infer<typeof createOrganizerSchema>) => {
      const result = await onCreateOrganizationAction(data);
      return result;
    },
    onError: (error) => console.error(error.message),
    onSuccess: (data) => {
      if (data?.status === 200) {
        dispatch(resetOrganizationData());
        setStep(STEPS.DESCRIPTION);
        close();
        router.refresh();

        toast.success(data.message);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    },
  });

  return {
    createOrganizationMutate,
    isPending,
  };
};
