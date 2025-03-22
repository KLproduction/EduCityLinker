"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { schoolFacilities } from "@/data/data";

type Props = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const EditFacilities = ({ setValue, watch }: Props) => {
  const selectedFacilities: string[] = watch("facility") || [];

  const handleToggleFacility = (facilityLabel: string) => {
    const isSelected = selectedFacilities.includes(facilityLabel);
    const updatedFacilities = isSelected
      ? selectedFacilities.filter((f) => f !== facilityLabel)
      : [...selectedFacilities, facilityLabel];

    setValue("facility", updatedFacilities, { shouldValidate: true });
  };

  return (
    <div className="grid h-full grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
      {schoolFacilities.map((item) => {
        const selected = selectedFacilities.includes(item.label!);
        return (
          <div
            key={item.label}
            className={cn(
              "flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-rose-800",
              selected ? "border-rose-800" : "border-zinc-400",
            )}
            onClick={() => handleToggleFacility(item.label!)}
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

export default EditFacilities;
