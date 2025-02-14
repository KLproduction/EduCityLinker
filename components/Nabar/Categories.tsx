"use client";

import { categories, courseTypes, features } from "@/data/data";
import MyContainer from "../Container";

import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const Categories = () => {
  const params = useSearchParams();
  const category = params.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/explore";

  if (!isMainPage) return null;

  return (
    <div className="h-full w-full bg-transparent backdrop-blur-md">
      <MyContainer>
        <div className="flex items-center justify-between overflow-x-auto pt-4">
          {courseTypes.map((item) => (
            <CategoryBox
              key={item.title}
              label={item.title || null}
              icon={item.icon}
              selected={category === item.title}
            />
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default Categories;
