"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setCourseData,
  resetCourseData,
} from "@/redux/slice/create-courseSlice";
import { courseTypes } from "@/data/data";

const CourseTypeInput = () => {
  const courseData = useAppSelector((state) => state.createCourse);
  const dispatch = useAppDispatch();

  return (
    <div className="grid max-h-[40vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
      {courseTypes.map((item) => {
        const selected = courseData.courseType === item.title;
        return (
          <div
            key={item.title}
            className={cn(
              "flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-rose-800",
              selected ? "border-rose-800" : "border-zinc-400",
            )}
            onClick={() => dispatch(setCourseData({ courseType: item.title! }))}
          >
            <input type="radio" value={item.title!} className="hidden" />

            <div className="text-xs font-medium">{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseTypeInput;
