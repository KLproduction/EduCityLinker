import Categories from "@/components/Nabar/Categories";
import Navbar from "@/components/Nabar/Navbar";
import React from "react";

import MyContainer from "@/components/Container";
import DashboardSideBar from "./_components/DashboardSideBar";
import { getOrganizationIdByUserIdAction } from "@/actions/organization";
import { currentUser } from "@/lib/auth";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const user = await currentUser();
  const organizationId = await getOrganizationIdByUserIdAction(user?.id!);

  return (
    <div className="container relative flex w-screen flex-col items-center justify-center">
      <div className="mb-48">
        <Navbar />
      </div>

      <div className="flex w-full justify-center gap-3">
        <DashboardSideBar organizationId={organizationId?.organization?.id!} />
        <div className="min-w-[3/4] flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
