"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrashIcon } from "lucide-react";
import StudentNationPieChat from "@/components/global/StudentNationPieChat";
import { useEffect, useState } from "react";
import { useUpdateNationality } from "@/hooks/create-organization";

type Props = {
  organizationId: string;
  studentNations: { nation: string; count: number }[];
};

const EditStudentNation = ({ organizationId, studentNations }: Props) => {
  const { updateNationalities, isPending } =
    useUpdateNationality(organizationId);

  // Local state to manage nationalities before submitting
  const [nationalities, setNationalities] = useState(studentNations);

  useEffect(() => {
    setNationalities(studentNations);
  }, [studentNations]);

  const handleAdd = () => {
    setNationalities([...nationalities, { nation: "", count: 0 }]);
  };

  const handleChange = (
    index: number,
    field: "nation" | "count",
    value: string | number,
  ) => {
    setNationalities((prev) =>
      prev.map((nation, i) =>
        i === index ? { ...nation, [field]: value } : nation,
      ),
    );
  };

  const handleRemove = (index: number) => {
    setNationalities(nationalities.filter((_, i) => i !== index));
  };

  const handleIncrement = (index: number) => {
    setNationalities((prev) =>
      prev.map((nation, i) =>
        i === index ? { ...nation, count: nation.count + 1 } : nation,
      ),
    );
  };

  const handleDecrement = (index: number) => {
    setNationalities((prev) =>
      prev.map((nation, i) =>
        i === index && nation.count > 1
          ? { ...nation, count: nation.count - 1 }
          : nation,
      ),
    );
  };

  // Filter valid data (no empty nations, no zero counts)
  const chartData = nationalities.filter(
    (item) => item.nation && item.count > 0,
  );

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-xl font-bold">Nationality of Students</h1>

      {/* Input Section */}
      {nationalities.map((item, index) => (
        <Card
          key={index}
          className="relative flex flex-col items-center gap-4 border-none bg-none p-4 shadow-none"
        >
          <div className="absolute right-2 top-2">
            <Button
              variant="ghost"
              onClick={() => handleRemove(index)}
              type="button"
            >
              <TrashIcon size={16} className="text-red-500" />
            </Button>
          </div>
          <Input
            placeholder="Enter Nationality"
            value={item.nation}
            onChange={(e) => handleChange(index, "nation", e.target.value)}
            className="w-1/2"
          />
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleDecrement(index)}
            >
              -
            </Button>
            <Input
              type="number"
              placeholder="Number of Students"
              value={item.count}
              onChange={(e) =>
                handleChange(index, "count", Number(e.target.value))
              }
              className="w-20 text-center"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleIncrement(index)}
            >
              +
            </Button>
          </div>
        </Card>
      ))}
      <div className="flex w-full flex-col">
        <Button
          type="button"
          onClick={handleAdd}
          className="mt-2"
          variant={"outline"}
        >
          Add Nationality
        </Button>
      </div>

      {/* Pie Chart Section */}
      {chartData.length > 0 && (
        <div className="flex justify-center">
          <StudentNationPieChat data={chartData} />
        </div>
      )}
      {/* Submit Button */}
      <div className="flex w-full flex-col">
        <Button
          type="submit"
          onClick={() => updateNationalities(nationalities)}
          disabled={isPending}
          className="mt-2"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default EditStudentNation;
