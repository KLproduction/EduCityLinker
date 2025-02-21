"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  createOrganizerSchema,
  nationalitySchema,
  socialMediaSchema,
} from "@/schemas";
import { z } from "zod";

export const onCreateOrganizationAction = async (
  organizationData: z.infer<typeof createOrganizerSchema>,
  studentNationData: z.infer<typeof nationalitySchema>[] | [],
  socialMediaData: z.infer<typeof socialMediaSchema>,
) => {
  const user = await currentUser();

  if (!user) {
    console.log("User not found or unauthorized");
    return {
      status: 401,
      message: "User not found or unauthorized",
    };
  }

  const validationResult = createOrganizerSchema.safeParse(organizationData);
  if (!validationResult.success) {
    console.error(validationResult.error.flatten());
    return {
      status: 400,
      message: "Invalid organization data",
    };
  }

  const organization = await db.organization.create({
    data: {
      ...validationResult.data,
      userId: user.id!,
    },
  });
  if (organization) {
    if (studentNationData.length > 0) {
      await db.nationality.createMany({
        data: studentNationData.map((nation) => ({
          ...nation,
          organizationId: organization.id,
        })),
      });
    }
    if (socialMediaData) {
      await db.socialMedia.create({
        data: {
          ...socialMediaData,
          organizationId: organization.id,
        },
      });
    }
  }
  return {
    status: 200,
    message: "Organization created successfully!",
    organization,
  };
};
