"use client";

import { categories } from "@/data/data";
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
