"use server";

import { z } from "zod";
import { enrollmentRequestSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EnrollmentRequestState } from "@prisma/client";

export const createEnrollmentRequestAction = async (
  enrollmentData: z.infer<typeof enrollmentRequestSchema>,
  listingId: string,
) => {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return { status: 401, message: "User not found or unauthorized" };
    }

    const organization = await db.listing.findUnique({
      where: { id: listingId },
      select: { organizationId: true },
    });

    if (!organization) {
      return { status: 404, message: "Organization not found" };
    }

    const validationResult = enrollmentRequestSchema.safeParse(enrollmentData);
    if (!validationResult.success) {
      console.error(validationResult.error.flatten());
      return {
        status: 400,
        message: "Invalid enrollment data",
        errors: validationResult.error.flatten(),
      };
    }

    const enrollmentRequest = await db.enrollmentRequest.create({
      data: {
        ...validationResult.data,
        status: validationResult.data.status as EnrollmentRequestState,
        userId: user.id,
        listingId,
        organizationId: organization.organizationId,
        addOnPrice:
          validationResult.data.accommodationPrice +
          validationResult.data.airportTransferPrice,
      },
    });

    return {
      enrollmentRequest,
      status: 200,
      message: "Enrollment request submitted successfully!",
    };
  } catch (error: any) {
    return { status: 500, message: error.message || "Database error" };
  }
};
