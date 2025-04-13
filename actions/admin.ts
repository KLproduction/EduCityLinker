"use server";

import { AIMO_DISCOUNT } from "@/data/data";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EnrollmentRequestState } from "@prisma/client";
import { list } from "postcss";

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

export const adminDeleteDummyEnrollmentRequests = async () => {
  const user = await currentUser();

  if (user?.email !== "kent.law.production01@gmail.com") return;

  const result = await db.enrollmentRequest.deleteMany({
    where: {
      emailAddress: {
        contains: "dummy",
      },
    },
  });

  if (result) {
    return {
      status: 200,
      message: "All dummy enrollment requests deleted successfully!",
    };
  }
  return { status: 500, message: "Something went wrong!" };
};

export const adminAddDummyEnrollmentRequest = async () => {
  const user = await currentUser();

  if (user?.email !== "kent.law.production01@gmail.com") return;

  if (!user?.id) {
    return {
      status: 400,
      message: "User ID is required to create dummy request.",
    };
  }

  const organizations = await db.organization.findMany({
    include: { listings: true },
  });

  if (!organizations.length) {
    return { status: 500, message: "No organizations found." };
  }

  const organization =
    organizations[Math.floor(Math.random() * organizations.length)];

  if (!organization.listings.length) {
    return { status: 500, message: "Selected organization has no listings." };
  }

  const listing =
    organization.listings[
      Math.floor(Math.random() * organization.listings.length)
    ];

  const hasAccommodation = Math.random() > 0.5;
  const hasAirportTransfer = true;

  const accommodationPrice = hasAccommodation
    ? (organization.accommodationHomeStayPrice ??
      organization.accommodationStudentResidencePrice ??
      0)
    : 0;

  const airportTransfersTypeOptions = ["Arrival and Departure"];
  const airportTransfersType =
    airportTransfersTypeOptions[
      Math.floor(Math.random() * airportTransfersTypeOptions.length)
    ];

  const airportTransferPrice = hasAirportTransfer
    ? organization.airportTransferArrivalOnlyPrice || 0
    : 0;

  const weeks = Math.floor(Math.random() * 12) + 1;
  const courseTotalPriceBeforeDiscount = listing.price * weeks;
  const courseTotalPrice = courseTotalPriceBeforeDiscount * AIMO_DISCOUNT;
  const addOnPrice = accommodationPrice + airportTransferPrice;
  const orderTotalPrice = courseTotalPrice + addOnPrice;

  const result = await db.enrollmentRequest.create({
    data: {
      userId: user.id,
      firstName: "DummyFirstName",
      sureName: "DummySureName",
      contactNumber: "1234567890",
      emailAddress: "dummy@example.com",
      startDate: new Date(),
      weeks,
      airportTransfer: hasAirportTransfer,
      airportTransfersType,
      accommodation: hasAccommodation,
      accommodationPrice,
      airportTransferPrice,
      coursePrice: listing.price,
      createdAt: new Date(),
      status: EnrollmentRequestState.PENDING,
      centerConfirmed: false,
      centerConfirmationDate: null,
      listingId: listing.id,
      organizationId: organization.id,
      courseTotalPriceBeforeDiscount,
      courseTotalPrice,
      addOnPrice,
      orderTotalPrice,
    },
  });

  return {
    status: 200,
    message: "Dummy enrollment request added successfully!",
    data: result,
  };
};
