import Categories from "@/components/Nabar/Categories";
import Navbar from "@/components/Nabar/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ExploreLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      {children}
    </div>
  );
};

export default ExploreLayout;
