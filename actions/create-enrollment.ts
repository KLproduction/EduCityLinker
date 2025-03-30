"use server";

import { z } from "zod";
import {
  editEnrollmentRequestSchema,
  enrollmentRequestSchema,
} from "@/schemas";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  EnrollmentConfirmationState,
  EnrollmentRequestState,
} from "@prisma/client";
import { getOrganizationByIdAction } from "./create-organization";
import { AIMO_DISCOUNT } from "@/data/data";

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

    if (enrollmentData.startDate <= new Date()) {
      return { status: 400, message: "Start date must be in the future" };
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

    const addOnPrice = accommodationPrice + airportTransferPrice;
    const courseTotalPriceBeforeDiscount =
      listing!.price * validationResult.data.weeks;
    const courseTotalPrice = courseTotalPriceBeforeDiscount * AIMO_DISCOUNT;

    const enrollmentRequest = await db.enrollmentRequest.create({
      data: {
        ...validationResult.data,
        status: validationResult.data.status as EnrollmentRequestState,
        userId: user.id,
        listingId,
        organizationId: organization.id,
        centerConfirmed: false,
        centerConfirmationDate: null,
        accommodationPrice: accommodationPrice,
        airportTransferPrice: airportTransferPrice,
        addOnPrice: addOnPrice,
        coursePrice: listing!.price,
        courseTotalPriceBeforeDiscount: courseTotalPriceBeforeDiscount,
        courseTotalPrice: courseTotalPrice,
        orderTotalPrice: courseTotalPrice + addOnPrice,
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
export const getEnrollmentRequestsWithOrganizationByIdAction = async (
  id: string,
) => {
  try {
    const enrollmentRequests = await db.enrollmentRequest.findUnique({
      where: { id },
      include: { organization: true },
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

export const getAllEnrollmentRequestsAction = async () => {
  try {
    const enrollmentRequests = await db.enrollmentRequest.findMany();
    if (enrollmentRequests.length > 0) {
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

export const onUpdateEnrollmentRequestAction = async (
  enrollmentId: string,
  data: z.infer<typeof editEnrollmentRequestSchema>,
) => {
  try {
    const enrollmentRequest = await db.enrollmentRequest.findUnique({
      where: { id: enrollmentId },
    });
    if (!enrollmentRequest) {
      return { status: 404, message: "Enrollment request not found" };
    }
    const validationResult = editEnrollmentRequestSchema.safeParse(data);
    if (!validationResult.success) {
      console.error(validationResult.error.flatten());
      return {
        status: 400,
        message: "Invalid enrollment data",
        errors: validationResult.error.flatten(),
      };
    } else {
      const courseTotalPriceBeforeDiscount =
        validationResult.data.coursePrice * validationResult.data.weeks;

      const addOnPrice =
        validationResult.data.accommodationPrice +
        validationResult.data.airportTransferPrice;
      const courseTotalPrice = courseTotalPriceBeforeDiscount * AIMO_DISCOUNT;

      if (
        validationResult.data.status ===
        EnrollmentRequestState.CONFIRM_BY_CENTER
      ) {
        const enrollmentRequest = await db.enrollmentRequest.update({
          where: { id: enrollmentId },
          data: {
            ...validationResult.data,
            courseTotalPriceBeforeDiscount: courseTotalPriceBeforeDiscount,
            addOnPrice: addOnPrice,
            courseTotalPrice: courseTotalPrice,
            orderTotalPrice: courseTotalPrice + addOnPrice,
            centerConfirmed: true,
            centerConfirmationDate: new Date(),
          },
        });

        await db.enrollmentConfirmation.create({
          data: {
            requestId: enrollmentRequest.id,
            userId: enrollmentRequest.userId,
            confirmedByUser: false,
            userConfirmationDate: new Date(),
            status: EnrollmentConfirmationState.AWAITING_USER,
          },
        });

        if (enrollmentRequest) {
          return {
            status: 200,
            message: "Enrollment request updated successfully",
          };
        }
        return {
          status: 404,
          message: "Enrollment request not found",
        };
      } else {
        const enrollmentRequest = await db.enrollmentRequest.update({
          where: { id: enrollmentId },
          data: {
            ...validationResult.data,
            courseTotalPriceBeforeDiscount: courseTotalPriceBeforeDiscount,
            addOnPrice: addOnPrice,
            courseTotalPrice: courseTotalPrice,
            orderTotalPrice: courseTotalPrice + addOnPrice,
            centerConfirmed: false,
            centerConfirmationDate: null,
          },
        });
        if (enrollmentRequest) {
          return {
            status: 200,
            message: "Enrollment request updated successfully",
          };
        }
        return {
          status: 404,
          message: "Enrollment request not found",
        };
      }
    }
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};

export const onConfirmEnrollmentRequestAction = async (
  enrollmentId: string,
) => {
  try {
    const existingEnrollmentRequest = await db.enrollmentRequest.findUnique({
      where: { id: enrollmentId },
    });

    if (!existingEnrollmentRequest) {
      return { status: 404, message: "Enrollment request not found" };
    }

    const enrollmentConfirmation = await db.enrollmentConfirmation.findFirst({
      where: { requestId: existingEnrollmentRequest.id },
    });

    if (!enrollmentConfirmation) {
      return { status: 404, message: "Enrollment confirmation not found" };
    }
    return {
      enrollmentConfirmation,
      status: 200,
    };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};
