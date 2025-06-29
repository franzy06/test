"use client";

import { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import DailyStats from "@/components/DailyStats";
import TaskList from "@/components/TaskList";
import ProgressChart from "@/components/ProgressChart";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  points: number;
}

interface DailyData {
  focusTime: number; // in minutes
  completedSessions: number;
  dailyStreak: number;
  totalPoints: number;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      completed: false,
      points: 25,
    },
    {
      id: "2",
      title: "Review team presentations",
      completed: false,
      points: 15,
    },
    { id: "3", title: "Update documentation", completed: false, points: 20 },
    { id: "4", title: "Team sync meeting", completed: false, points: 10 },
  ]);

  const [dailyData, setDailyData] = useState<DailyData>({
    focusTime: 205, // 3h 25m in minutes
    completedSessions: 4,
    dailyStreak: 5,
    totalPoints: 0,
  });

  const [currentSession, setCurrentSession] = useState(1);
  const [weeklyData, setWeeklyData] = useState([3, 5, 2, 6, 4, 3, 1]);

  // Format minutes to hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Handle session completion
  const handleSessionComplete = () => {
    setDailyData((prev) => ({
      ...prev,
      focusTime: prev.focusTime + 25, // Add 25 minutes for completed session
      completedSessions: prev.completedSessions + 1,
    }));
    setCurrentSession((prev) => prev + 1);

    // Update today's data in weekly chart
    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1; // Convert Sunday (0) to index 6
    setWeeklyData((prev) => {
      const newData = [...prev];
      newData[todayIndex] = Math.min(newData[todayIndex] + 1, 8); // Cap at 8 sessions
      return newData;
    });
  };

  // Handle task completion
  const handleTaskComplete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      setDailyData((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints + task.points,
      }));
    }
  };

  // Handle adding new task
  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <h1 className="text-xl font-semibold text-slate-700">Focus Flow</h1>
          </div>
          <div className="text-slate-500 text-sm">
            Tuesday, June 28 | 2:14 PM
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-300 transition-colors">
            <div className="w-4 h-4 rounded-full bg-slate-600"></div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Stats & Calendar */}
          <div className="lg:col-span-1 space-y-6">
            <DailyStats
              focusTime={formatTime(dailyData.focusTime)}
              completedSessions={dailyData.completedSessions}
              dailyStreak={dailyData.dailyStreak}
            />

            {/* Motivational Quote */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white">
              <div className="text-2xl mb-3">💭</div>
              <p className="text-sm leading-relaxed mb-3">
                "The only way to do great work is to love what you do."
              </p>
              <p className="text-xs opacity-80">- Steve Jobs</p>
            </div>
          </div>

          {/* Center Column - Timer */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <Timer
              onSessionComplete={handleSessionComplete}
              currentSession={currentSession}
              totalSessions={8}
            />

            {/* Tasks Section */}
            <div className="w-full mt-8">
              <TaskList
                tasks={tasks}
                onTaskComplete={handleTaskComplete}
                onAddTask={handleAddTask}
              />
            </div>
          </div>

          {/* Right Column - Progress & Settings */}
          <div className="lg:col-span-1 space-y-6">
            <ProgressChart weeklyData={weeklyData} />

            {/* Quick Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">
                Quick Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <span className="text-sm">🔊</span>
                    </div>
                    <span className="text-sm text-slate-600">Sound</span>
                  </div>
                  <div className="w-12 h-6 bg-red-400 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <span className="text-sm">🔔</span>
                    </div>
                    <span className="text-sm text-slate-600">
                      Notifications
                    </span>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <span className="text-sm">⚙️</span>
                    </div>
                    <span className="text-sm text-slate-600">
                      Timer Settings
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                    <span className="text-xs text-slate-500">⚙️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-700">
                  Current Level
                </h3>
                <span className="text-sm font-medium text-red-400">
                  Level 5
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-xs text-slate-500">
                750/1000 XP to next level
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
