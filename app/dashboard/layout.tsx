import Navbar from "@/components/Nabar/Navbar";
import React from "react";
import { getOrganizationIdByUserIdAction } from "@/actions/organization";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateOrganizerModal } from "@/components/modals/CreateOrganizerModal";
import { getFullInfoByUserId, getUserById } from "@/data/user";
import { CreateCourseModal } from "@/components/modals/CreateCourseModal";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const auth = await currentUser();
  const user = await getFullInfoByUserId(auth?.id!);

  if (!user || (user.role !== "ORGANIZER" && user.role !== "ADMIN")) {
    redirect("/");
  }

  return (
    <div className="container relative flex w-screen flex-col items-center justify-center">
      <div className="mb-48">
        <Navbar />
      </div>
      <div>{children}</div>

      {user &&
        user?.organization.length > 0 &&
        (() => {
          const organizationId = user?.organization[0].id;
          return (
            <CreateCourseModal user={user} organizationId={organizationId} />
          );
        })()}
      <CreateOrganizerModal />
    </div>
  );
};

export default DashboardLayout;
