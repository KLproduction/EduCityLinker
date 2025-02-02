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

const countrySelectValueSchema = z.object({
  flag: z.string(),
  label: z.string(),
  latlng: z.tuple([z.number(), z.number()]), // ✅ Ensure latlng is [number, number]
  region: z.string(),
  value: z.string(),
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
  category: z.string(),
  location: countrySelectValueSchema.optional(),
  courseLevels: z.enum(courseLevelLabels),
  ageGroups: z.enum(ageGroupLabels),
  maxStudents: z.number().min(1),
  durationWeeks: z.number().min(1),
  price: z.number().min(1),
  imageSrc: z.string(),
  title: z.string().optional(),
  description: z.string().min(1),
});
