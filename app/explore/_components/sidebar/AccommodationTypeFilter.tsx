"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { accommodationTypes } from "@/data/data";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

const AccommodationTypeFilter = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleSelection = (label: string) => {
    setSelectedTypes((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const [labels, setLabels] = useQueryState(
    "accommodation-types",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  useEffect(() => {
    setLabels(selectedTypes.join(","));
  }, [selectedTypes]);

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">Accommodation Types</h1>

      {accommodationTypes.map((type) => (
        <div key={type.label} className="flex items-start">
          <Checkbox
            checked={selectedTypes.includes(type.label)}
            onCheckedChange={() => toggleSelection(type.label)}
            className="mr-3 mt-1"
          />
          <div>
            <p className="text-sm">{type.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationTypeFilter;
