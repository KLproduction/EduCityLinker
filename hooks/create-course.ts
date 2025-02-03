import { createCourseSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import countries from "world-countries";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/actions/uploadImage";
import { toast } from "sonner";
import { setCourseData, useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { googleLat } from "@/components/GoogleMapSimple";

export const useCreateCourse = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    getValues,
    reset,
  } = useForm<z.infer<typeof createCourseSchema>>({
    defaultValues: {
      category: "",
      location: undefined,
      maxStudents: 1,
      durationWeeks: 1,
      price: 1,
      imageSrc: "",
      title: "",
    },
  });

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    reset,
    getValues,
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

export const useUploadImage = () => {
  const dispatch = useAppDispatch();
  const courseData = useAppSelector((state) => state.createCourse);
  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: async (fileData: File) => {
      const result = await uploadImage(fileData);
      return result.cdnUrl;
    },
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      dispatch(setCourseData({ imageSrc: data }));
      console.log(courseData);
      toast.success("Image uploaded successfully!");
    },
  });

  return {
    uploadImageMutate,
    isPending,
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
