import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  addStudentNation,
  updateStudentNation,
  removeStudentNation,
} from "@/redux/slice/create-organizationNationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import StudentNationPieChat from "../global/StudentNationPieChat";
import { TrashIcon } from "lucide-react";

const StudentNationInput = () => {
  const dispatch = useAppDispatch();
  const nationalities = useAppSelector((state) => state.studentNation);

  const handleAdd = () => {
    dispatch(addStudentNation({ nation: "", count: 0 }));
  };

  const handleChange = (
    index: number,
    field: "nation" | "count",
    value: string | number,
  ) => {
    dispatch(updateStudentNation({ index, data: { [field]: value } }));
  };

  const handleRemove = (index: number) => {
    dispatch(removeStudentNation(index));
  };

  const handleIncrement = (index: number) => {
    handleChange(index, "count", nationalities[index].count + 1);
  };

  const handleDecrement = (index: number) => {
    if (nationalities[index].count > 1) {
      handleChange(index, "count", nationalities[index].count - 1);
    }
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
            <Button variant="ghost" onClick={() => handleRemove(index)}>
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
            <Button variant="ghost" onClick={() => handleDecrement(index)}>
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
            <Button variant="ghost" onClick={() => handleIncrement(index)}>
              +
            </Button>
          </div>
        </Card>
      ))}
      <Button onClick={handleAdd} className="mt-2">
        Add Nationality
      </Button>

      {/* Pie Chart Section */}
      {chartData.length > 0 && (
        <div className="flex justify-center">
          <StudentNationPieChat data={chartData} />
        </div>
      )}
    </div>
  );
};

export default StudentNationInput;
