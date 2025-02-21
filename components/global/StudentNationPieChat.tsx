import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type Props = {
  data: { nation: string; count: number }[];
};
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF5E78",
  "#50B5FF",
];

const StudentNationPieChat = ({ data }: Props) => {
  return (
    <div className="flex justify-center">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="nation"
          cx="50%"
          cy="50%"
          outerRadius={130}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default StudentNationPieChat;
