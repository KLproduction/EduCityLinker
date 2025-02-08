import { deleteUploadcare, uploadImage } from "@/actions/uploadImage";
import {
  appendToGallery,
  setOrganizationData,
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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
