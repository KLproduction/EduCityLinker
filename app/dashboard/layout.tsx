import Categories from "@/components/Nabar/Categories";
import Navbar from "@/components/Nabar/Navbar";
import React from "react";

import MyContainer from "@/components/Container";
import DashboardSideBar from "./_components/DashboardSideBar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="relative flex w-screen flex-col items-center justify-center">
      <div className="mb-48">
        <Navbar />
      </div>

      <div className="flex justify-center gap-3">
        <DashboardSideBar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
