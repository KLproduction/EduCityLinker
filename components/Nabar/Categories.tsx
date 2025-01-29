"use client";

import MyContainer from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSkiing } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";

export const categories = [
  {
    label: null,
    icon: AiOutlineGlobal,
    description: "All",
  },
  {
    label: "Beach",
    icon: TbBeach,
    description: "This is a beach city.",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This is a beach city.",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This is a modern city.",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This is in the countryside.",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is near the pool.",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This is on an Island.",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This is close to a lake.",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This is near to skiing activities.",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This is near to castle.",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This has camping activities.",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This is luxurious.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/explore";

  if (!isMainPage) return null;

  return (
    <MyContainer>
      <div className="flex items-center justify-between overflow-x-auto pt-4">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </MyContainer>
  );
};

export default Categories;
