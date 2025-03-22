"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { features } from "@/data/data";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type Props = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const EditFeatures = ({ setValue, watch }: Props) => {
  // Get the current selected features from the form
  const selectedFeatures = watch("feature") || [];

  const handleToggleFeature = (featureLabel: string) => {
    if (selectedFeatures.includes(featureLabel)) {
      // Remove the feature
      const updatedFeature = selectedFeatures.filter(
        (feature: string) => feature !== featureLabel,
      );
      setValue("feature", updatedFeature, { shouldValidate: true });
    } else {
      // Add the feature
      setValue("feature", [...selectedFeatures, featureLabel], {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className="grid h-full grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
      {features.map((item) => {
        const selected = selectedFeatures.includes(item.label!);
        return (
          <div
            key={item.label}
            className={cn(
              "flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-rose-800",
              selected ? "border-rose-800" : "border-zinc-400",
            )}
            onClick={() => handleToggleFeature(item.label!)}
          >
            <input type="checkbox" value={item.label!} className="hidden" />
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

export default EditFeatures;
