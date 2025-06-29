"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  points: number;
}

interface TaskListProps {
  tasks?: Task[];
  onTaskComplete?: (taskId: string) => void;
  onAddTask?: (task: Omit<Task, "id">) => void;
}

const TaskList = ({
  tasks = [
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
  ],
  onTaskComplete = () => {},
  onAddTask = () => {},
}: TaskListProps) => {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  const handleTaskToggle = (taskId: string) => {
    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
    onTaskComplete(taskId);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-700">Today's Tasks</h3>
        <button
          onClick={() =>
            onAddTask({ title: "New Task", completed: false, points: 10 })
          }
          className="text-red-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      <div className="space-y-4">
        {localTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between py-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  className="w-5 h-5 rounded-full border-2 border-slate-300 data-[state=checked]:bg-green-400 data-[state=checked]:border-green-400"
                />
                {task.completed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm cursor-pointer transition-colors ${
                  task.completed
                    ? "line-through text-slate-400"
                    : "text-slate-600 group-hover:text-slate-800"
                }`}
              >
                {task.title}
              </label>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              +{task.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
