"use server";

import { db } from "@/lib/db";
import { SettingSchema, UserRoleSchema } from "@/schemas";
import { User } from "@prisma/client";
import { z } from "zod";

export const getAllUserAction = async () => {
  try {
    const users = await db.user.findMany();
    if (users.length > 0) {
      return { users, status: 200 };
    }
    return { status: 404, message: "Enrollment requests not found" };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};

export const onUpdateUserAction = async (
  userId: string,
  data: z.infer<typeof UserRoleSchema>,
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return {
      status: 200,
      message: "User updated successfully",
      user: updatedUser,
    };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};
