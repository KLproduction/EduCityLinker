"use server";

import { db } from "@/lib/db";

export const getListingsAction = async () => {
  try {
    const listings = await db.listing.findMany({
      include: { organization: true },
      orderBy: { createdAt: "desc" },
    });

    if (listings) {
      return {
        listings,
        status: 200,
      };
    }
    return {
      status: 404,
      message: "Listing not found",
    };
  } catch (e) {
    console.error(e);
  }
};

export const getListingByIdAction = async (listingId: string) => {
  if (!listingId) return;
  try {
    const listing = await db.listing.findUnique({
      where: { id: listingId },
      include: { organization: true },
    });
    if (listing) {
      return {
        listing,
        status: 200,
      };
    }
    return {
      status: 404,
      message: "Listing not found",
    };
  } catch (e) {
    console.error(e);
  }
};

export const getOrganizationWithListingAction = async () => {
  try {
    const organization = await db.organization.findMany({
      include: { listings: true },
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
  } catch (e) {
    console.error(e);
  }
};

export const getOrganizationByOrganizationIdAction = async (
  organizationId: string,
) => {
  try {
    const organization = await db.organization.findUnique({
      where: { id: organizationId },
    });
    if (organization) {
      console.log("Organization found");

      return {
        organization,
        status: 200,
      };
    }
    console.log("Organization not found");
    return {
      status: 404,
      message: "Organization not found",
    };
  } catch (e) {
    console.error(e);
  }
};
export const getOrganizationByListingIdAction = async (listingId: string) => {
  try {
    const listing = await db.listing.findUnique({
      where: { id: listingId },
    });
    if (listingId) {
      const organization = await db.organization.findUnique({
        where: { id: listing?.organizationId },
      });

      return {
        organization,
        status: 200,
      };
    }
    console.log("Organization not found");
    return {
      status: 404,
      message: "Organization not found",
    };
  } catch (e) {
    console.error(e);
  }
};

export const getOrganizationByIdAction = async (organizationId: string) => {
  if (!organizationId) return;
  console.log("organizationName");
  try {
    const organization = await db.organization.findUnique({
      where: { id: organizationId },
      include: { listings: true },
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
  } catch (e) {
    console.error(e);
  }
};
export const getOrganizationByPaymentIdAction = async (paymentId: string) => {
  if (!paymentId) return;

  try {
    const enrollmentPayment = await db.enrollmentPayment.findUnique({
      where: { id: paymentId },
    });
    if (!enrollmentPayment) return;

    const enrollmentConfirm = await db.enrollmentConfirmation.findFirst({
      where: { id: enrollmentPayment.confirmationId },
    });
    if (!enrollmentConfirm) return;
    const enrollmentRequest = await db.enrollmentRequest.findUnique({
      where: { id: enrollmentConfirm.requestId },
    });
    if (!enrollmentRequest) return;
    const organization = await db.organization.findUnique({
      where: { id: enrollmentRequest.organizationId },
      select: { name: true },
    });

    if (organization) {
      console.log("Organization found");
      return {
        organization,
        status: 200,
      };
    }
    return {
      status: 404,
      message: "Organization not found",
    };
  } catch (e) {
    console.error(e);
  }
};

export const getStudentNationByOrganizationIdAction = async (
  organizationId: string,
) => {
  if (!organizationId) return;
  try {
    const studentNations = await db.nationality.findMany({
      where: { organizationId },
      select: {
        nation: true,
        count: true,
      },
    });
    if (studentNations) {
      return {
        studentNations,
        status: 200,
      };
    }
    return {
      status: 404,
      message: "Student Nations not found",
    };
  } catch (e) {
    console.error(e);
  }
};

export const getSocialMediaByOrganizationIdAction = async (
  organizationId: string,
) => {
  if (!organizationId) return;
  try {
    const socialMedia = await db.socialMedia.findFirst({
      where: { organizationId },
    });

    if (!socialMedia) return;

    return {
      socialMedia,
      status: 200,
    };
  } catch (e) {
    console.error(e);
  }
};

export const getListingByOrganizationIdAction = async (
  organizationId: string,
) => {
  if (!organizationId) return;
  try {
    const listing = await db.listing.findMany({
      where: { organizationId },
    });

    if (listing) {
      return {
        listing,
        status: 200,
      };
    }
    return {
      status: 404,
      message: "Listing not found",
    };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Database error" };
  }
};
