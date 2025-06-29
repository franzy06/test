"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface DailyStatsProps {
  focusTime?: string;
  completedSessions?: number;
  dailyStreak?: number;
}

const DailyStats = ({
  focusTime = "3h 25m",
  completedSessions = 4,
  dailyStreak = 5,
}: DailyStatsProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get current month and year
  const month = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  // Generate calendar days
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();

  // Days of the week
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Generate calendar grid
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="w-6 h-6"></div>);
  }

  // Add days of the month
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentMonth.getMonth() &&
    today.getFullYear() === currentMonth.getFullYear();
  const currentDate = today.getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = isCurrentMonth && day === currentDate;
    calendarDays.push(
      <div
        key={`day-${day}`}
        className={cn(
          "w-6 h-6 flex items-center justify-center text-xs rounded-full",
          isToday
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted cursor-pointer",
        )}
      >
        {day}
      </div>,
    );
  }

  return (
    <div className="space-y-6">
      {/* Daily Stats Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          Daily Stats
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Focus Time</span>
            <span className="font-semibold text-slate-700">{focusTime}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Completed Sessions</span>
            <span className="font-semibold text-slate-700">
              {completedSessions}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Daily Streak</span>
            <span className="font-semibold text-slate-700">
              {dailyStreak} days
            </span>
          </div>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-700">{`${month} ${year}`}</h3>
          <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
            <span className="text-xs text-slate-500">📅</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-medium"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => {
            if (React.isValidElement(day) && day.props.children) {
              const dayNumber = day.props.children;
              const isToday = isCurrentMonth && dayNumber === currentDate;
              const isHighlighted = dayNumber === 28; // Highlight the 28th as in the design

              return (
                <div
                  key={index}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center text-xs rounded-full cursor-pointer transition-colors",
                    isToday
                      ? "bg-red-400 text-white font-semibold"
                      : isHighlighted
                        ? "bg-red-400 text-white font-semibold"
                        : "hover:bg-slate-100 text-slate-600",
                  )}
                >
                  {dayNumber}
                </div>
              );
            }
            return day;
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyStats;
