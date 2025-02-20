import { createCourseSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import countries from "world-countries";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/actions/uploadImage";
import { toast } from "sonner";
import {
  resetCourseData,
  setCourseData,
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";
import { useState } from "react";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { googleLat } from "@/components/GoogleMapSimple";
import { createCourseAction } from "@/actions/createCourse";
import { useCreateCourseModal } from "./modal";
import { STEPS } from "@/components/modals/CreateCourseModal";
import { useRouter } from "next/navigation";

export const useCreateCourse = (
  data: z.infer<typeof createCourseSchema>,
  setStep: (step: STEPS) => void,
) => {
  const dispatch = useAppDispatch();
  const { close } = useCreateCourseModal();
  const router = useRouter();
  const { mutate: createCourseMutate, isPending: isCreatingCourse } =
    useMutation({
      mutationFn: async () => {
        const result = await createCourseAction(data);

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
          console.log("Mutation Success Data:", data);
          toast.success("Course created successfully!");
          dispatch(resetCourseData());
          setStep(STEPS.CATEGORY);
          close();
          router.refresh();
        }
        toast.error(data.message);
        console.log(data.message);
      },
    });

  return {
    createCourseMutate,
    isCreatingCourse,
  };
};

export const useSelectCountry = () => {
  const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  }));

  const getAll = () => formattedCountries;
  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export const useGoogleLocation = () => {
  const [location, setLocation] = useState<PlaceAutocompleteResult | null>(
    null,
  );

  const [center, setCenter] = useState<googleLat | null>(null);

  return {
    location,
    setLocation,
    center,
    setCenter,
  };
};
