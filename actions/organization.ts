"use server";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getOrganizationIdByUserIdAction = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        organization: {
          select: {
            id: true,
          },
        },
      },
    });

    if (user?.role === UserRole.ADMIN) {
      if (user.organization.length > 0) {
        return { organization: user.organization[0].id, status: 200 };
      } else {
        const organizations = await db.organization.findMany();
        return { organization: organizations[0].id, status: 200 };
      }
    }

    if (user?.role === UserRole.ORGANIZER) {
      if (user.organization.length > 0) {
        return { organization: user.organization[0].id, status: 200 };
      } else {
        return { status: 404, message: "Organization not found" };
      }
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
export const getAllOrganizationsAction = async () => {
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
