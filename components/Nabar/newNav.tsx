import React from "react";
import MyContainer from "../Container";
import MySearch from "./MySearch";
import UserMenu from "./UserMenu";

type Props = {};

const NewNav = (props: Props) => {
  return (
    <div className="fixed inset-0 z-10 h-16 w-full bg-white/75 shadow-sm backdrop-blur-sm">
      <div className="">
        <MyContainer>
          <div className="md:map-10 flex h-16 items-center justify-between gap-3">
            <div className="text-transparent">AMIO</div>
            <div className="">
              <MySearch />
            </div>
            <div>
              <UserMenu />
            </div>
          </div>
        </MyContainer>
      </div>
    </div>
  );
};

export default NewNav;
