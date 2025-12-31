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
    <div className="relative flex w-full flex-col items-center justify-center">
      <div className="mb-48">
        <Navbar />
      </div>

      <div className="mt-6 flex w-full items-start gap-3 px-12">
        <ExploreSideBar />
        <div className="w-full min-w-0">{children}</div>
      </div>
    </div>
  );
};

export default ExploreLayout;
