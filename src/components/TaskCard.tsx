import type { Task } from "../types/Task";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const priorityColors: Record<Task["priority"], string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <p className="font-medium text-gray-900">{task.title}</p>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-3">{task.description}</p>
      <div className="flex justify-end">
        <p className="text-xs text-gray-400">
          Assigned to: <span className="text-gray-600">{task.assignedTo}</span>
        </p>
      </div>
    </div>
  );
}
