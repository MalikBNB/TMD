import type React from "react";
import type { Task } from "../types/Task";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onClick, onDelete }: TaskCardProps) {
  const priorityColors: Record<Task["priority"], string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();

    const result = await Swal.fire({
      icon: "error",
      title: "Delete task",
      text: "Are you sure you want to delete this task?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });
    if (result.isConfirmed) onDelete();
  }

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-pointer hover:border-blue-600"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <p className="font-medium text-gray-900">{task.title}</p>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-3">{task.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">
          Assigned to: <span className="text-gray-600">{task.assignedTo}</span>
        </p>

        <button
          className=" text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          onClick={handleDelete}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
