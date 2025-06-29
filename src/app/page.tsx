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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl primary-gradient flex items-center justify-center shadow-lg glow-effect">
              <div className="w-6 h-6 rounded-xl bg-white flex items-center justify-center">
                <div className="w-3 h-3 rounded-lg primary-gradient"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Focus Flow
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Productivity Timer
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-slate-600 text-sm font-semibold">
              Tuesday, June 28
            </div>
            <div className="text-slate-500 text-xs">2:14 PM</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 button-hover border border-white/50 shadow-md">
            <div className="w-6 h-6 rounded-xl accent-gradient flex items-center justify-center">
              <div className="w-3 h-3 rounded-lg bg-slate-600"></div>
            </div>
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
            <div className="accent-gradient rounded-3xl p-6 text-slate-700 shadow-xl border border-white/30 card-hover">
              <div className="text-3xl mb-4">💭</div>
              <p className="text-sm leading-relaxed mb-4 font-medium">
                &quot;The only way to do great work is to love what you
                do.&quot;
              </p>
              <p className="text-xs opacity-70 font-semibold">- Steve Jobs</p>
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
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 card-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl primary-gradient flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⚙️</span>
                </div>
                <h3 className="text-lg font-bold text-slate-700">
                  Quick Settings
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center">
                      <span className="text-white text-sm">🔊</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      Sound
                    </span>
                  </div>
                  <div className="w-14 h-7 primary-gradient rounded-full relative cursor-pointer button-hover shadow-lg">
                    <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md transition-all duration-300"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50 to-pink-50 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-sm">🔔</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      Notifications
                    </span>
                  </div>
                  <div className="w-14 h-7 bg-slate-300 rounded-full relative cursor-pointer button-hover shadow-lg">
                    <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md transition-all duration-300"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-sm">⚙️</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      Timer Settings
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 button-hover border border-pink-200">
                    <span className="text-sm text-pink-600">→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl secondary-gradient flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🏆</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-700">
                    Current Level
                  </h3>
                </div>
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-xl border border-pink-200">
                  <span className="text-sm font-bold text-pink-600">
                    Level 5
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-2xl h-4 mb-3 shadow-inner">
                <div
                  className="primary-gradient h-4 rounded-2xl shadow-lg glow-effect transition-all duration-500"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500 font-medium">
                  750/1000 XP to next level
                </p>
                <div className="text-xs bg-gradient-to-r from-pink-100 to-blue-100 text-pink-600 font-bold px-2 py-1 rounded-lg border border-pink-200">
                  75%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
