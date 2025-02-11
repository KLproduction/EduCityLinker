import Categories from "@/components/Nabar/Categories";
import Navbar from "@/components/Nabar/Navbar";
import React from "react";
import ExploreSideBar from "./_components/sidebar/ExploreSideBar";
import MyContainer from "@/components/Container";

type Props = {
  children: React.ReactNode;
};

const ExploreLayout = ({ children }: Props) => {
  return (
    <div className="relative flex w-screen flex-col items-center justify-center">
      <div className="mb-48">
        <Navbar />
      </div>

      <div className="flex justify-center gap-3">
        <ExploreSideBar />
        {children}
      </div>
    </div>
  );
};

export default ExploreLayout;
