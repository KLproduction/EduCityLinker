"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const adminDeleteAllListings = async () => {
  const user = await currentUser();
  if (user?.email !== "kent.law.production01@gmail.com") return;
  const result = await db.listing.deleteMany();
  if (result) {
    return { status: 200, message: "All listing deleted successfully!" };
  }
  return { status: 500, message: "Something went wrong!" };
};

export const adminDeleteAllEnrollmentRequests = async () => {
  const user = await currentUser();

  if (user?.email !== "kent.law.production01@gmail.com") return;

  const result = await db.enrollmentRequest.deleteMany();

  if (result) {
    return {
      status: 200,
      message: "All enrollment requests deleted successfully!",
    };
  }
  return { status: 500, message: "Something went wrong!" };
};
