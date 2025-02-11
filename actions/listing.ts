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

export const getOrganizationByListingIdAction = async (
  organizationId: string,
) => {
  try {
    const organization = await db.organization.findUnique({
      where: { id: organizationId },
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
