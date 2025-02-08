"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  setOrganizationData,
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";
import { features } from "@/data/data";

const CategoryInput = () => {
  const organization = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  return (
    <div className="grid max-h-[40vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
      {features
        .filter((cat) => cat.description !== "All")
        .map((item) => {
          const selected = item.label
            ? organization.feature?.includes(item.label)
            : false;
          const onAddingFeatures = organization.feature?.includes(item.label!)
            ? dispatch(
                setOrganizationData({
                  feature: organization.feature?.filter(
                    (feature) => feature !== item.label!,
                  ),
                }),
              )
            : dispatch(
                setOrganizationData({
                  feature: [...organization.feature!, item.label!],
                }),
              );
          return (
            <div
              key={item.label}
              className={cn(
                "flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-rose-800",
                selected ? "border-rose-800" : "border-zinc-400",
              )}
              onClick={() => {
                onAddingFeatures;
              }}
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
