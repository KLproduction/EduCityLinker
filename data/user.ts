import { db } from "@/lib/db";

export const getUserByEmail = async (email: any) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        enrollmentRequest: true,
        organization: true,
      },
    });
    console.log("getUserById success");
    return user;
  } catch {
    return null;
  }
};
