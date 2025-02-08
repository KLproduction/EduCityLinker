"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  appendToFeature,
  setOrganizationData,
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";

import { features } from "@/data/data";

const FeatureInput = () => {
  const organizationData = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  const handleToggleFeature = (featureLabel: string) => {
    if (organizationData.feature?.includes(featureLabel)) {
      const updatedFeature = organizationData.feature.filter(
        (feature) => feature !== featureLabel,
      );
      dispatch(setOrganizationData({ feature: updatedFeature }));
    } else {
      dispatch(appendToFeature(featureLabel));
    }
  };

  return (
    <div className="grid max-h-[40vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
      {features.map((item) => {
        const selected = organizationData.feature?.includes(item.label!);
        return (
          <div
            key={item.label}
            className={cn(
              "flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-rose-800",
              selected ? "border-rose-800" : "border-zinc-400",
            )}
            onClick={() => handleToggleFeature(item.label!)}
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

export default FeatureInput;
