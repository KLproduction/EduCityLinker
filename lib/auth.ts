"use server";

import { auth } from "@/auth";
import { db } from "./db";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
export const currentRole = async () => {
  const session = await auth();

  return session?.user.role;
};

export const currentOrganization = async () => {
  const user = await currentUser();
  if (user) {
    const userId = user?.id;
    const organization = await db.organization.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (organization) {
      return {
        organization,
        status: 200,
      };
    }
    return {
      status: 404,
      message: "Organization not found",
    };
  }
  return {
    status: 404,
    message: "User not found",
  };
};
