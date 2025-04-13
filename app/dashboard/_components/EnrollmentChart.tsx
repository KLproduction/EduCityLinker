"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { EnrollmentRequest } from "@prisma/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  enrollmentRequests: EnrollmentRequest[];
};

const EnrollmentChart = ({ enrollmentRequests }: Props) => {
  const [timeRange, setTimeRange] = useState("1week");
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Enrollments",
        data: [],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const calculateData = () => {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      let startDate;

      if (timeRange === "1week") {
        startDate = new Date(today); // clone
        startDate.setDate(startDate.getDate() - 6); // 6 days ago + today = 7 total
        startDate.setHours(0, 0, 0, 0);
      } else if (timeRange === "1month") {
        startDate = new Date();
        startDate.setMonth(today.getMonth() - 1);
      } else if (timeRange === "1year") {
        startDate = new Date();
        startDate.setFullYear(today.getFullYear() - 1);
      } else {
        return;
      }

      const filteredData = enrollmentRequests.filter((request) => {
        const createdAt = new Date(request.createdAt);
        return createdAt >= startDate && createdAt <= today;
      });

      const groupedData = filteredData.reduce(
        (acc, request) => {
          const dateKey = new Date(request.createdAt)
            .toISOString()
            .split("T")[0];
          acc[dateKey] = (acc[dateKey] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      const labels = Object.keys(groupedData).sort();
      const values = labels.map((label) => groupedData[label]);

      setChartData({
        labels,
        datasets: [
          {
            label: "Enrollments",
            data: values,
            borderColor: "#4F46E5",
            backgroundColor: "rgba(79, 70, 229, 0.5)",
          },
        ],
      });
    };

    calculateData();
  }, [timeRange, enrollmentRequests]);

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-semibold">Enrollment Trends</h2>
      <div className="mb-4 flex gap-4">
        <button
          className={`rounded px-4 py-2 ${
            timeRange === "1week" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setTimeRange("1week")}
        >
          1 Week
        </button>
        <button
          className={`rounded px-4 py-2 ${
            timeRange === "1month" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setTimeRange("1month")}
        >
          1 Month
        </button>
        <button
          className={`rounded px-4 py-2 ${
            timeRange === "1year" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setTimeRange("1year")}
        >
          1 Year
        </button>
      </div>
      <Line data={chartData} />
    </div>
  );
};

export default EnrollmentChart;
