import {
  getOrganizationByIdAction,
  onCreateOrganizationAction,
  updateNationalityAction,
  updateOrganizationAction,
  updateSocialMediaAction,
} from "@/actions/create-organization";
import { deleteUploadcare, uploadImage } from "@/actions/uploadImage";
import {
  appendToGallery,
  resetOrganizationData,
  setOrganizationData,
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";
import {
  createCourseSchema,
  createOrganizerSchema,
  nationalitySchema,
  socialMediaSchema,
  updateNationalitySchema,
} from "@/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateOrganizerModal } from "./modal";
import { STEPS } from "@/components/modals/CreateOrganizerModal";
import { useRouter } from "next/navigation";
import { appendToAmenityGallery } from "@/redux/slice/create-organizationSlice";
import { resetStudentNationData } from "@/redux/slice/create-organizationNationSlice";
import { resetSocialMediaData } from "@/redux/slice/create-organizationSocialMediaSlice";
import { useForm, UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Listing, Organization } from "@prisma/client";
import { updateListingAction } from "@/actions/createCourse";

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
export const useEditLogo = (setLogoSrc: (src: string) => void) => {
  const dispatch = useAppDispatch();
  const organizationData = useAppSelector((state) => state.organization);
  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: async (fileData: File) => {
      const result = await uploadImage(fileData);
      return result.uuid;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      setLogoSrc(data);

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
export const useEditCoverPhoto = (setCoverPhoto: (id: string) => void) => {
  const { mutate: uploadCoverPhotoMutate, isPending } = useMutation({
    mutationFn: async (fileData: File) => {
      const result = await uploadImage(fileData);
      return result.uuid;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      setCoverPhoto(data);
      toast.success("Image uploaded successfully!");
      console.log("Cover Photo", data);
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
export const useEditGallery = (
  setGallery: (updateFn: (prev: string[]) => string[]) => void,
) => {
  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: async (fileData: File) => {
      const result = await uploadImage(fileData);
      return result.uuid;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      setGallery((prev) => [...prev, data]);
      console.log("Gallery", data);
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

export const useEditRoomGallery = (
  setValue: UseFormSetValue<any>,
  currentGallery: string[],
) => {
  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: async (fileData: File) => {
      const result = await uploadImage(fileData);
      return result.uuid;
    },
    onError: (error) => {
      toast.error("Failed to upload image: " + error.message);
    },
    onSuccess: (uploadedId: string) => {
      const updatedGallery = [...currentGallery, uploadedId];
      setValue("amenityGallery", updatedGallery, { shouldValidate: true });
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

export const useEditOrganizationFromDB = (organizationData: Organization) => {
  const data = organizationData;
  const router = useRouter();
  const defaultFormValues: z.infer<typeof createOrganizerSchema> = {
    name: data.name,
    description: data.description || "",
    logo: data.logo || "",
    coverPhoto: data.coverPhoto || "",
    gallery: data.gallery || [],
    feature: data.feature || [],
    facility: data.facility || [],
    accommodationTypes: data.accommodationTypes,
    roomTypes: data.roomTypes || undefined,
    roomAmenities: data.roomAmenities || [],
    location: data.location,
    city: data.city,
    country: data.country,
    lat: data.lat,
    lng: data.lng,
    distanceOfAmenities: data.distanceOfAmenities || 0,
    amenityGallery: data.amenityGallery || [],
    rating: data.rating || 3,
    ratingDescription: data.ratingDescription || "",
    lessonDuration: data.lessonDuration || 1,
    studentMinAge: data.studentMinAge,
    studentMaxAge: data.studentMaxAge,
    averageStudentPerClass: data.averageStudentPerClass,
    accommodationHomeStayPrice: data.accommodationHomeStayPrice!,
    accommodationStudentResidencePrice:
      data.accommodationStudentResidencePrice!,
    accommodationPrivateApartmentPrice:
      data.accommodationPrivateApartmentPrice!,
    homeStayPreference: data.homeStayPreference || [],
    airportTransfers: data.airportTransfers!,
    airportTransferOnArrivalAndDeparturePrice:
      data.airportTransferOnArrivalAndDeparturePrice!,
    airportTransferArrivalOnlyPrice: data.airportTransferArrivalOnlyPrice!,
    airportTransferDepartureOnlyPrice: data.airportTransferDepartureOnlyPrice!,
  };
  const { register, handleSubmit, setValue, reset, watch, getValues } = useForm<
    z.infer<typeof createOrganizerSchema>
  >({
    resolver: zodResolver(createOrganizerSchema),
    defaultValues: defaultFormValues,
  });

  const { mutate: updateOrganizationMutate, isPending } = useMutation({
    mutationFn: async (
      organizationData: z.infer<typeof createOrganizerSchema>,
    ) => {
      const result = await updateOrganizationAction(data.id, organizationData);
      return result;
    },
    onError: (error) => console.error(error.message),
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.error(data?.message);
      }
    },
  });

  const submit = handleSubmit((data) => updateOrganizationMutate(data));
  const resetToDefault = () => {
    reset(defaultFormValues);
  };
  return {
    register,
    submit,
    setValue,
    reset,
    watch,
    isPending,
    getValues,
    resetToDefault,
  };
};
export const useUpdateNationality = (organizationId: string) => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (data: { nation: string; count: number }[]) => {
      if (!organizationId) {
        throw new Error("Organization ID is required");
      }
      return updateNationalityAction(organizationId, data);
    },
    onError: (error) => {
      console.error("Failed to update nationalities:", error);
      toast.error("Failed to update nationalities. Please try again.");
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data?.message || "Error updating nationalities.");
      }
    },
  });

  return { updateNationalities: mutate, isPending, isSuccess, isError };
};

export const useUpdateSocialMedia = (organizationId: string) => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof socialMediaSchema>) => {
      if (!organizationId) {
        throw new Error("Organization ID is required");
      }
      return updateSocialMediaAction(organizationId, data);
    },
    onError: (error) => {
      console.error("Failed to update social media:", error);
      toast.error("Failed to update social media. Please try again.");
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data?.message || "Error updating social media.");
      }
    },
  });
  return { updateSocialMedia: mutate, isPending, isSuccess, isError };
};
