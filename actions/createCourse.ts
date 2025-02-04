"use server";

import { currentOrganization, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { useAppSelector } from "@/redux/store";
import { createCourseSchema } from "@/schemas";
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
        category: courseData.category,
        location: courseData.location as string,
        lat: courseData.lat!,
        lng: courseData.lng!,
        courseLevels: courseData.courseLevels,
        ageGroups: courseData.ageGroups,
        maxStudents: courseData.maxStudents,
        durationWeeks: courseData.durationWeeks,
        price: courseData.price,
        imageSrc: courseData.imageSrc,
        title: courseData.title!,
        description: courseData.description,
        organizationId: organization.organization.id,
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
