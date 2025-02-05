"use server";

import { db } from "@/lib/db";

export const getListingsAction = async () => {
  try {
    const listings = await db.listing.findMany({
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
