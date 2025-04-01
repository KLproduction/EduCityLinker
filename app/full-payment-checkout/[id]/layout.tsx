import Navbar from "@/components/Nabar/Navbar";
import React from "react";
import { getOrganizationIdByUserIdAction } from "@/actions/organization";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const CheckOutLayout = async ({ children }: Props) => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/");
  }

  return (
    <div className="container relative flex w-screen flex-col items-center justify-center">
      <div className="mb-48">
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CheckOutLayout;
