import Navbar from "@/components/Nabar/Navbar";
import React from "react";
import {
  getOrganizationIdByUserIdAction,
  getOrganizationsNameAction,
} from "@/actions/organization";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import OrganizationSideBar from "../../_components/OrganizationSideBar";
import { getListingByOrganizationIdAction } from "@/actions/listing";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string };
};

const DashboardLayout = async ({
  children,
  params: { organizationId },
}: Props) => {
  const user = await currentUser();
  const organizations = await getOrganizationsNameAction();
  const listings = await getListingByOrganizationIdAction(organizationId);

  if (!user || (user.role !== "ORGANIZER" && user.role !== "ADMIN")) {
    redirect("/");
  }

  return (
    <div className="container relative flex w-screen flex-col items-center justify-center">
      <div className="mb-48">
        <Navbar />
      </div>

      <div className="flex w-full justify-center gap-3">
        <OrganizationSideBar
          organizations={organizations!}
          listings={listings?.listing!}
          organizationId={organizationId}
          user={user}
        />
        <div className="w-full flex-1 md:min-w-[3/4]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
