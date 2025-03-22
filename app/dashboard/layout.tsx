import Navbar from "@/components/Nabar/Navbar";
import React from "react";
import DashboardSideBar from "./_components/DashboardSideBar";
import { getOrganizationIdByUserIdAction } from "@/actions/organization";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const user = await currentUser();
  const organizationId = await getOrganizationIdByUserIdAction(user?.id!);

  if (!user || (user.role !== "ORGANIZER" && user.role !== "ADMIN")) {
    redirect("/");
  }

  return (
    <div className="container relative flex w-screen flex-col items-center justify-center">
      <div className="mb-48">
        <Navbar />
      </div>

      <div className="flex w-full justify-center gap-3">
        <DashboardSideBar organizationId={organizationId?.organization?.id!} />
        <div className="w-full flex-1 md:min-w-[3/4]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
