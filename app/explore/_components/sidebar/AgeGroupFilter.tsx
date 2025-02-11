"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ageGroups } from "@/data/data";
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { useEffect, useState } from "react";
type Props = {};

const AgeGroupFilter = (props: Props) => {
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const toggleSelection = (label: string) => {
    setSelectedAgeGroups((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };
  const [labels, setLabels] = useQueryState(
    "age-groups",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  useEffect(() => {
    setLabels(selectedAgeGroups.join(","));
  }, [selectedAgeGroups]);

  return (
    <div className="space-y-3">
      {ageGroups.map((group) => (
        <div key={group.label} className="flex items-start">
          <Checkbox
            checked={selectedAgeGroups.includes(group.label)}
            onCheckedChange={() => toggleSelection(group.label)}
            className="mr-3 mt-1"
          />
          <div>
            <p className="text-sm">{group.label}</p>
            <p className="text-xs text-gray-500">{group.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgeGroupFilter;
