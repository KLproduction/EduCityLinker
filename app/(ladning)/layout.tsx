import MobileNavbar from "@/components/Nabar/MobileNavbar";
import Navbar from "@/components/Nabar/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden">
        <MobileNavbar />
      </div>

      {children}
    </div>
  );
};

export default LandingLayout;
