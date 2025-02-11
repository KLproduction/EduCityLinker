import { Listing, Organization } from "@prisma/client";

export type TListingWithOrganization = {
  data: (Organization[] & { listings: Listing[] })[];
};
