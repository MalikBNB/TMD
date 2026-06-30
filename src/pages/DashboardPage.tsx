import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchTasks } from "../store/tasksSlice";
import SummaryCard from "../components/SummaryCard";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.tasks.items);

  const totalTasks = items.length;
  const todoCount = items.filter((t) => t.status === "todo").length;
  const progressCount = items.filter((t) => t.status === "progress").length;
  const doneCount = items.filter((t) => t.status === "done").length;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <SummaryCard label="Total" value={totalTasks} />
      <SummaryCard label="To Do" value={todoCount} />
      <SummaryCard label="In Progress" value={progressCount} />
      <SummaryCard label="Done" value={doneCount} />
    </div>
  );
}
