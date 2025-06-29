"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface ProgressChartProps {
  weeklyData?: number[];
  daysOfWeek?: string[];
}

const ProgressChart = ({
  weeklyData = [3, 5, 2, 6, 4, 3, 1],
  daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
}: ProgressChartProps) => {
  const maxValue = Math.max(...weeklyData, 8); // Set minimum max value to 8 for consistent scale

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">
        Weekly Progress
      </h3>

      <div className="h-[120px] w-full">
        <div className="flex h-full items-end justify-between gap-2">
          {weeklyData.map((value, index) => {
            const heightPercentage = Math.max((value / maxValue) * 100, 8); // Minimum height for visibility
            const isToday =
              index === new Date().getDay() - 1 ||
              (index === 6 && new Date().getDay() === 0);

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-end flex-1"
              >
                <div className="text-xs text-slate-400 mb-1 font-medium">
                  {value}
                </div>
                <div
                  className={`w-full rounded-t-lg transition-all hover:opacity-80 ${
                    isToday ? "bg-red-400" : "bg-red-300"
                  }`}
                  style={{ height: `${heightPercentage}%` }}
                />
                <span className="mt-2 text-xs text-slate-500 font-medium">
                  {daysOfWeek[index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
