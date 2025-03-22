"use server";

import { db } from "@/lib/db";

export const getOrganizationIdByUserIdAction = async (userId: string) => {
  try {
    const organization = await db.organization.findFirst({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });
    if (organization) {
      return { organization, status: 200 };
    }
    return { status: 404, message: "Organization not found" };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};

export const getOrganizationSocialMediaAction = async (
  organizationId: string,
) => {
  try {
    const organization = await db.organization.findUnique({
      where: {
        id: organizationId,
      },
      select: {
        socialMedia: true,
      },
    });
    if (organization) {
      return { organization, status: 200 };
    }
    return { status: 404, message: "Organization not found" };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};

export const getOrganizationsNameAction = async () => {
  try {
    const organizations = await db.organization.findMany({
      select: {
        name: true,
        id: true,
      },
    });
    console.log(organizations);
    return organizations;
  } catch (e) {
    console.error(e);
  }
};
