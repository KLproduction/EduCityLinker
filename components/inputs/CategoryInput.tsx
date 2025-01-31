"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import React from "react";
import { useCreateCourse } from "@/hooks/create-course";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setCourseData,
  resetCourseData,
} from "@/redux/slice/create-courseSlice";
import { categories } from "@/data/data";

const CategoryInput = () => {
  const courseData = useAppSelector((state) => state.createCourse);
  const dispatch = useAppDispatch();

  console.log(courseData);
  return (
    <div className="grid max-h-[40vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
      {categories
        .filter((cat) => cat.description !== "All")
        .map((item) => {
          const selected = courseData.category === item.label;
          return (
            <div
              key={item.label}
              className={cn(
                "flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-rose-800",
                selected ? "border-rose-800" : "border-zinc-400",
              )}
              onClick={() => dispatch(setCourseData({ category: item.label! }))}
            >
              <input type="radio" value={item.label!} className="hidden" />
              {item.icon &&
                React.createElement(item.icon, {
                  className: "h-6 w-6 text-gray-700",
                })}
              <div className="text-xs font-medium">{item.label}</div>
            </div>
          );
        })}
    </div>
  );
};

export default CategoryInput;
