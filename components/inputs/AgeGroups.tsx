"use client";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setCourseData } from "@/redux/slice/create-courseSlice";
import React from "react";
import { ageGroups } from "@/data/data";

const AgeGroupInput = () => {
  const courseData = useAppSelector((state) => state.createCourse);
  const dispatch = useAppDispatch();

  return (
    <div className="grid max-h-[40vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
      {ageGroups.map((group) => {
        const selected = courseData.ageGroups === group.label;
        return (
          <div key={group.label}>
            <div
              className={cn(
                "flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-rose-800",
                selected ? "border-rose-800" : "border-zinc-400",
              )}
              onClick={() =>
                dispatch(setCourseData({ ageGroups: group.label }))
              }
            >
              <input type="radio" value={group.label} className="hidden" />
              {group.icon &&
                React.createElement(group.icon, {
                  className: "h-6 w-6 text-gray-700",
                })}
              <div className="text-xs font-medium">{group.label}</div>
              <p className="text-xs text-gray-600">{group.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AgeGroupInput;
