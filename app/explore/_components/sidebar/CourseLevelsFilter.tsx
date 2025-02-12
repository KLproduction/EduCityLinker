"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ageGroups, courseLevels } from "@/data/data";
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { useEffect, useState } from "react";
type Props = {};

const CourseLevelsFilter = (props: Props) => {
  const [selectedCourseLevels, setSelectedCourseLevels] = useState<string[]>(
    [],
  );
  const toggleSelection = (label: string) => {
    setSelectedCourseLevels((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };
  const [labels, setLabels] = useQueryState(
    "course-levels",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  useEffect(() => {
    setLabels(selectedCourseLevels.join(","));
  }, [selectedCourseLevels]);

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">Course Levels</h1>
      {courseLevels.map((group) => (
        <div key={group.label} className="flex items-start">
          <Checkbox
            checked={selectedCourseLevels.includes(group.label)}
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

export default CourseLevelsFilter;
