"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface TimerProps {
  initialTime?: number; // in seconds
  onSessionComplete?: () => void;
  currentSession?: number;
  totalSessions?: number;
}

const Timer = ({
  initialTime = 25 * 60, // 25 minutes in seconds by default
  onSessionComplete = () => {},
  currentSession = 1,
  totalSessions = 4,
}: TimerProps) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus");

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setIsActive(false);
      onSessionComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, onSessionComplete]);

  // Handle mode change
  const handleModeChange = (value: string) => {
    setMode(value);
    setIsActive(false);

    // Set appropriate time based on mode
    switch (value) {
      case "focus":
        setTime(25 * 60); // 25 minutes
        break;
      case "shortBreak":
        setTime(5 * 60); // 5 minutes
        break;
      case "longBreak":
        setTime(15 * 60); // 15 minutes
        break;
      default:
        setTime(25 * 60);
    }
  };

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      {/* Timer Mode Tabs */}
      <div className="flex items-center gap-2 mb-8 bg-slate-100 rounded-full p-1">
        <button
          onClick={() => handleModeChange("focus")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            mode === "focus"
              ? "bg-red-400 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          Focus
        </button>
        <button
          onClick={() => handleModeChange("shortBreak")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            mode === "shortBreak"
              ? "bg-red-400 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => handleModeChange("longBreak")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            mode === "longBreak"
              ? "bg-red-400 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          Long Break
        </button>
      </div>

      {/* Timer Circle */}
      <div className="relative flex items-center justify-center w-80 h-80 rounded-full bg-slate-800 text-white mb-6 shadow-2xl">
        <div className="text-6xl font-light tracking-wider">
          {formatTime(time)}
        </div>
        <Button
          onClick={toggleTimer}
          className="absolute bottom-16 bg-red-400 hover:bg-red-500 text-white rounded-full px-8 py-3 text-sm font-medium shadow-lg transition-all hover:shadow-xl"
        >
          {isActive ? "PAUSE" : "START"}
        </Button>
      </div>

      {/* Session Counter */}
      <div className="text-sm text-slate-500 font-medium">
        Session {currentSession}/{totalSessions}
      </div>
    </div>
  );
};

export default Timer;
