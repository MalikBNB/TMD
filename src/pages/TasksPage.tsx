import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchTasks } from "../store/tasksSlice";

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.tasks.items);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const todoTasks = items.filter((t) => t.status === "todo");
  const progressTasks = items.filter((t) => t.status === "progress");
  const doneTasks = items.filter((t) => t.status === "done");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-center mb-4 font-bold text-gray-700">TODO</h2>
        {todoTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-center mb-4 font-bold text-gray-700">
          IN PROGRESS
        </h2>
        {progressTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-center mb-4 font-bold text-gray-700">DONE</h2>
        {doneTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
