import FacilitiesInput from "@/components/inputs/FacilitiesInput";
import { ageGroups, courseLevels } from "@/data/data";
import { UserRole } from "@prisma/client";
import { title } from "process";
import * as z from "zod";

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    },
  )

  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    },
  );

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 Characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum 8 Characters required",
  }),
});

const courseLevelLabels = courseLevels.map((level) => level.label) as [
  string,
  ...string[],
];
const ageGroupLabels = ageGroups.map((level) => level.label) as [
  string,
  ...string[],
];
export const createCourseSchema = z.object({
  courseType: z.string(),
  courseLevels: z.enum(courseLevelLabels),
  ageGroups: z.enum(ageGroupLabels),
  maxStudents: z.number().min(1),
  durationWeeks: z.number().min(1),
  price: z.number().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const createOrganizerSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  logo: z.string().optional(),
  coverPhoto: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  feature: z.array(z.string()).optional(),
  facility: z.array(z.string()).optional(),
  accommodationTypes: z.string().min(1),
  roomTypes: z.string().optional(),
  roomAmenities: z.array(z.string()).optional(),
  distanceOfAmenities: z.number().optional(),
  amenityGallery: z.array(z.string()).optional(),
  rating: z.number().min(0.5),
  ratingDescription: z.string().optional(),
  location: z.string(),
  lat: z.number(),
  lng: z.number(),
  lessonDuration: z.number().min(1),
  studentMinAge: z.number().min(1),
  studentMaxAge: z.number().min(1),
  averageStudentPerClass: z.number().min(1),
});

export const nationalitySchema = z.object({
  nation: z.string().min(1, "Nation name is required"),
  count: z
    .number()
    .int()
    .positive("Number of students must be a positive integer"),
});

export const socialMediaSchema = z.object({
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  website: z.string().url().optional(),
});
