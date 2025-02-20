"use client";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setCourseData } from "@/redux/slice/create-courseSlice";
import React from "react";
import { courseLevels } from "@/data/data";

// Define course levels instead of categories

const CourseLevelInput = () => {
  const courseData = useAppSelector((state) => state.createCourse);
  const dispatch = useAppDispatch();

  return (
    <div className="grid max-h-[40vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
      {courseLevels.map((level) => {
        const selected = courseData.courseLevels === level.label;
        return (
          <div key={level.label}>
            <div
              className={cn(
                "flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-rose-800",
                selected ? "border-rose-800" : "border-zinc-400",
              )}
              onClick={() =>
                dispatch(setCourseData({ courseLevels: level.label }))
              }
            >
              <input type="radio" value={level.label} className="hidden" />
              {level.icon &&
                React.createElement(level.icon, {
                  className: "h-6 w-6 text-gray-700",
                })}
              <div className="text-xs font-medium">{level.label}</div>
              {/* <p className="text-xs text-gray-600">{level.description}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseLevelInput;
