"use server";

import { currentOrganization, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { useAppSelector } from "@/redux/store";
import { createCourseSchema, createOrganizerSchema } from "@/schemas";
import { z } from "zod";

export const createCourseAction = async (
  courseData: z.infer<typeof createCourseSchema>,
) => {
  try {
    const user = await currentUser();
    const organization = await currentOrganization();

    if (!user?.id) {
      return { status: 401, message: "User not found or unauthorized" };
    }

    if (organization.status !== 200 || !organization.organization?.id) {
      return { status: 404, message: "Organization not found" };
    }

    const validationResult = createCourseSchema.safeParse(courseData);
    if (!validationResult.success) {
      return {
        status: 400,
        message: "Invalid course data",
        errors: validationResult.error.flatten(),
      };
    }

    // Create course in database
    const course = await db.listing.create({
      data: {
        ...validationResult.data,
        userId: user.id,
      },
    });

    return {
      course,
      status: 200,
      message: "Course created successfully!",
    };
  } catch (error: any) {
    return { status: 500, message: error.message || "Database error" };
  }
};

export const deleteAllListingSuperAdminAction = async () => {
  const user = await currentUser();
  const isAdmin = user?.role === "ADMIN" ? true : false;

  if (!isAdmin) return;

  try {
    const result = await db.listing.deleteMany();
    if (result) {
      return { status: 200, message: "All listing deleted successfully!" };
    }
  } catch (e) {
    console.error(e);
  }
};

export const getOrganizationsAction = async () => {
  try {
    const organizations = await db.organization.findMany();

    return organizations;
  } catch (e) {
    console.error(e);
  }
};

export const updateListingAction = async (
  listingId: string,
  data: z.infer<typeof createCourseSchema>,
) => {
  if (!listingId) {
    console.log("Organization not found");
    return;
  }
  try {
    const listing = await db.listing.findUnique({
      where: { id: listingId },
    });
    if (listing) {
      console.log("Listing found");
      const result = createCourseSchema.safeParse(data);
      if (!result.success) {
        console.error(result.error.flatten());
        return;
      }
      await db.listing.update({
        where: { id: listingId },
        data,
      });
      return { status: 200, message: "Course updated successfully!" };
    }
    return { status: 404, message: "Course not found" };
  } catch (e) {
    console.error(e);
  }
};
