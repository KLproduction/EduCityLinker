"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  createOrganizerSchema,
  nationalitySchema,
  socialMediaSchema,
} from "@/schemas";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
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

export const getOrganizationByIdAction = async (id: string) => {
  if (!id) {
    redirect("/dashboard");
  }

  const isValidMongoId = (id: string) => {
    return /^[a-f\d]{24}$/i.test(id);
  };

  if (!isValidMongoId(id)) {
    redirect("/dashboard");
  }

  const organization = await db.organization.findUnique({
    where: { id },
  });
  if (!organization) {
    console.log("Organization not found");
    redirect("/dashboard");
  }
  return {
    ...organization,
    // Change fallback from false (boolean) to "" (string)
    roomTypes: organization.roomTypes ?? "",
    description: organization.description ?? "",
    logo: organization.logo ?? "",
    coverPhoto: organization.coverPhoto ?? "",
    distanceOfAmenities: organization.distanceOfAmenities ?? 0,
    ratingDescription: organization.ratingDescription ?? "",
    accommodationHomeStayPrice: organization.accommodationHomeStayPrice ?? 0,
    accommodationStudentResidencePrice:
      organization.accommodationStudentResidencePrice ?? 0,
    accommodationPrivateApartmentPrice:
      organization.accommodationPrivateApartmentPrice ?? 0,
    airportTransferOnArrivalAndDeparturePrice:
      organization.airportTransferOnArrivalAndDeparturePrice ?? 0,
    airportTransferArrivalOnlyPrice:
      organization.airportTransferArrivalOnlyPrice ?? 0,
    airportTransferDepartureOnlyPrice:
      organization.airportTransferDepartureOnlyPrice ?? 0,
  };
};

export const updateOrganizationAction = async (
  organizationId: string,
  data: z.infer<typeof createOrganizerSchema>,
) => {
  if (!organizationId) {
    console.log("Organization not found");
    return;
  }
  try {
    const organization = await db.organization.findUnique({
      where: { id: organizationId },
    });
    if (organization) {
      console.log("Organization found");
      const result = createOrganizerSchema.safeParse(data);
      if (!result.success) {
        console.error(result.error.flatten());
        return;
      }
      await db.organization.update({
        where: { id: organizationId },
        data,
      });
      return { status: 200, message: "Organization updated successfully!" };
    }
    return { status: 404, message: "Organization not found" };
  } catch (e) {
    console.error(e);
  }
};

export const updateNationalityAction = async (
  organizationId: string,
  data: { nation: string; count: number }[],
) => {
  try {
    const existingNationalities = await db.nationality.findMany({
      where: { organizationId },
    });

    if (existingNationalities) {
      await db.nationality.deleteMany({
        where: { organizationId },
      });
      await db.nationality.createMany({
        data: data.map((nation) => ({
          ...nation,
          organizationId,
        })),
      });
      return { status: 200, message: "Nationality updated successfully!" };
    }
    return { status: 404, message: "Organization not found" };
  } catch (e) {
    console.error(e);
  }
};

export const updateSocialMediaAction = async (
  organizationId: string,
  data: z.infer<typeof socialMediaSchema>,
) => {
  try {
    const existingSocialMedia = await db.socialMedia.findFirst({
      where: { organizationId },
    });

    if (existingSocialMedia) {
      await db.socialMedia.update({
        where: { id: existingSocialMedia.id },
        data,
      });
      return { status: 200, message: "Social media updated successfully!" };
    }
    if (!existingSocialMedia) {
      await db.socialMedia.create({
        data: {
          ...data,
          organizationId,
        },
      });
      return { status: 200, message: "Social media created successfully!" };
    }
    return { status: 404, message: "Organization not found" };
  } catch (e) {
    console.error(e);
  }
};
