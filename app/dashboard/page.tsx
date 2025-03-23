import Navbar from "@/components/Nabar/Navbar";
import React from "react";
import DashboardSideBar from "./_components/DashboardSideBar";
import { currentUser } from "@/lib/auth";
import { getOrganizationIdByUserIdAction } from "@/actions/organization";
import { redirect } from "next/navigation";

type Props = {};

const DashboardPage = async (props: Props) => {
  const user = await currentUser();
  const organizationId = await getOrganizationIdByUserIdAction(user?.id!);

  if (!user || (user.role !== "ORGANIZER" && user.role !== "ADMIN")) {
    redirect("/");
  }
  return (
    <div className="container relative flex min-h-full w-screen flex-col items-center justify-center">
      <div className="flex w-full justify-center gap-3">
        <DashboardSideBar organizationId={organizationId?.organization?.id!} />
        <div className="w-full flex-1 md:min-w-[3/4]">Dashboard Page</div>
      </div>
    </div>
  );
};

export default DashboardPage;
