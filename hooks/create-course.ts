import { createCourseSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import countries from "world-countries";

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
      location: "",
      guestCount: 1,
      courseCount: 1,
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
