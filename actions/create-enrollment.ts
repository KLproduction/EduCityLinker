"use server";

import { z } from "zod";
import { enrollmentRequestSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EnrollmentRequestState } from "@prisma/client";
import { getOrganizationByIdAction } from "./create-organization";

export const createEnrollmentRequestAction = async (
  enrollmentData: z.infer<typeof enrollmentRequestSchema>,
  listingId: string,
) => {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return { status: 401, message: "User not found or unauthorized" };
    }

    const listing = await db.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return { status: 404, message: "Listing not found" };
    }

    const organization = await getOrganizationByIdAction(
      listing.organizationId,
    );

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

    let accommodationPrice;
    if (validationResult.data.accommodation) {
      if (organization?.accommodationHomeStayPrice! > 0) {
        accommodationPrice = organization.accommodationHomeStayPrice!;
      } else if (organization?.accommodationPrivateApartmentPrice! > 0) {
        accommodationPrice = organization.accommodationPrivateApartmentPrice!;
      } else if (organization?.accommodationStudentResidencePrice! > 0) {
        accommodationPrice = organization.accommodationStudentResidencePrice!;
      } else {
        accommodationPrice = 0;
      }
    } else {
      accommodationPrice = 0;
    }

    let airportTransferPrice;

    if (validationResult.data.airportTransfer) {
      if (
        validationResult.data.airportTransfersType === "Arrival and Departure"
      ) {
        airportTransferPrice =
          organization.airportTransferOnArrivalAndDeparturePrice!;
      } else if (
        validationResult.data.airportTransfersType === "Arrival Only"
      ) {
        airportTransferPrice = organization.airportTransferArrivalOnlyPrice!;
      } else if (
        validationResult.data.airportTransfersType === "Departure Only"
      ) {
        airportTransferPrice = organization.airportTransferDepartureOnlyPrice!;
      } else {
        airportTransferPrice = 0;
      }
    } else {
      airportTransferPrice = 0;
    }

    const enrollmentRequest = await db.enrollmentRequest.create({
      data: {
        ...validationResult.data,
        status: validationResult.data.status as EnrollmentRequestState,
        userId: user.id,
        listingId,
        organizationId: organization.id,
        accommodationPrice: accommodationPrice,
        airportTransferPrice: airportTransferPrice,
        addOnPrice: accommodationPrice + airportTransferPrice,
        totalPrice: listing!.price * 0.9 * validationResult.data.weeks,
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

export const getEnrollmentRequestsByUserIdAction = async (userId: string) => {
  try {
    const enrollmentRequests = await db.enrollmentRequest.findMany({
      where: { userId },
    });
    if (enrollmentRequests.length > 0) {
      return { enrollmentRequests, status: 200 };
    }
    return { status: 404, message: "Enrollment requests not found" };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};
export const getEnrollmentRequestsByIdAction = async (id: string) => {
  try {
    const enrollmentRequests = await db.enrollmentRequest.findUnique({
      where: { id },
    });
    if (enrollmentRequests) {
      return { enrollmentRequests, status: 200 };
    }
    return { status: 404, message: "Enrollment requests not found" };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};

export const onDeleteEnrollmentRequestAction = async (id: string) => {
  try {
    await db.enrollmentRequest.update({
      where: { id },
      data: { status: "CANCELLED" },
    });
    return { status: 200, message: "Enrollment request deleted successfully" };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};

// export const onUpdateEnrollmentRequestAction = async (
//   id: string,
//   data: z.infer<typeof updateEnrollmentRequestSchema>,
// ) => {
//   try {
//     const enrollmentRequest = await db.enrollmentRequest.findUnique({
//       where: { id },
//     });
//     if (!enrollmentRequest) {
//       return { status: 404, message: "Enrollment request not found" };
//     }
//     const validationResult = updateEnrollmentRequestSchema.safeParse(data);
//     if (!validationResult.success) {
//       console.error(validationResult.error.flatten());
//       return {
//         status: 400,
//         message: "Invalid enrollment data",
//         errors: validationResult.error.flatten(),
//       };
//     } else {
//       await db.enrollmentRequest.update({
//         where: { id },
//         data: validationResult.data,
//       });
//       return { status: 200, message: "Enrollment request updated successfully" };
//     }
//   } catch (e) {
//     console.error(e);
//     return { status: 500, message: "Database error" };
//   }
// };
