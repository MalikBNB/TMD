import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { addTask, editTask, fetchTasks, removeTask } from "../store/tasksSlice";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
} from "../api/requests/TaskRequests";
import type { Task } from "../types/Task";
import PageNavigator from "../components/PageNavigator";
import TaskCardSkeleton from "../components/TaskCardSkeleton";

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState({
    todo: 1,
    progress: 1,
    done: 1,
  });
  const [priorityFilter, setPriorityFilter] = useState<Task["priority"][]>([
    "low",
    "medium",
    "high",
  ]);

  const ITEMS_PER_PAGE = 3;

  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.tasks.items);
  const status = useAppSelector((state) => state.tasks.status);
  const error = useAppSelector((state) => state.tasks.error);

  const matchesFilters = (task: Task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) &&
    priorityFilter.includes(task.priority);

  const todoTasks = items.filter(
    (t) => t.status === "todo" && matchesFilters(t),
  );
  const progressTasks = items.filter(
    (t) => t.status === "progress" && matchesFilters(t),
  );
  const doneTasks = items.filter(
    (t) => t.status === "done" && matchesFilters(t),
  );

  function togglePriority(priority: Task["priority"]) {
    setPriorityFilter((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority],
    );
    setCurrentPage({ todo: 1, progress: 1, done: 1 });
  }

  const paginate = (tasks: Task[], page: number) =>
    tasks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const todoPage = paginate(todoTasks, currentPage.todo);
  const progressPage = paginate(progressTasks, currentPage.progress);
  const donePage = paginate(doneTasks, currentPage.done);

  const totalPages = (tasks: Task[]) =>
    Math.ceil(tasks.length / ITEMS_PER_PAGE);

  function handlePageChange(column: keyof typeof currentPage, page: number) {
    setCurrentPage((prev) => ({ ...prev, [column]: page }));
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  async function handleSubmit(task: CreateTaskRequest) {
    await dispatch(addTask(task));
    setIsModalOpen(false);
  }

  async function handleEditTask(data: UpdateTaskRequest) {
    if (!selectedTask) return;

    await dispatch(editTask({ id: selectedTask.id, updates: data }));
    setSelectedTask(null);
  }

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-end px-6 pt-6 gap-4">
          <div className="flex items-center gap-3">
            {(["low", "medium", "high"] as Task["priority"][]).map((p) => (
              <label
                key={p}
                className="flex items-center gap-1 text-sm capitalize"
              >
                <input
                  type="checkbox"
                  checked={priorityFilter.includes(p)}
                  onChange={() => togglePriority(p)}
                />{" "}
                {p}
              </label>
            ))}
          </div>
          <input
            className="bg-white rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage({ todo: 1, progress: 1, done: 1 });
            }}
          />
          <button
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            + Create Task
          </button>
        </div>

        {status === "failed" && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded px-4 py-3 mx-6 mb-2 mt-4">
            {error ?? "Failed to load tasks. Please try again."}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="bg-gray-200 rounded-lg p-4">
            <h2 className="text-center text-gray-700 mb-4 font-bold">TODO</h2>
            {status === "loading" ? (
              <>
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
              </>
            ) : todoTasks.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">
                No tasks here
              </p>
            ) : (
              todoPage?.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => setSelectedTask(task)}
                  onDelete={() => dispatch(removeTask(task.id))}
                />
              ))
            )}
            <PageNavigator
              currentPage={currentPage.todo}
              totalPages={totalPages(todoTasks)}
              onPageChange={(page) => handlePageChange("todo", page)}
            />
          </div>

          <div className="bg-blue-100 rounded-lg p-4">
            <h2 className="text-center text-blue-700 mb-4 font-bold">
              IN PROGRESS
            </h2>
            {status === "loading" ? (
              <>
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
              </>
            ) : progressTasks.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">
                No tasks here
              </p>
            ) : (
              progressPage?.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => setSelectedTask(task)}
                  onDelete={() => dispatch(removeTask(task.id))}
                />
              ))
            )}
            <PageNavigator
              currentPage={currentPage.progress}
              totalPages={totalPages(progressTasks)}
              onPageChange={(page) => handlePageChange("progress", page)}
            />
          </div>

          <div className="bg-green-100 rounded-lg p-4">
            <h2 className="text-center text-green-700 mb-4 font-bold">DONE</h2>
            {status === "loading" ? (
              <>
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
              </>
            ) : doneTasks.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">
                No tasks here
              </p>
            ) : (
              donePage?.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => setSelectedTask(task)}
                  onDelete={() => dispatch(removeTask(task.id))}
                />
              ))
            )}
            <PageNavigator
              currentPage={currentPage.done}
              totalPages={totalPages(doneTasks)}
              onPageChange={(page) => handlePageChange("done", page)}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <TaskForm onSubmit={handleSubmit} onCancel={handleModalClose} />
      </Modal>

      <Modal
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
      >
        {selectedTask && (
          <TaskForm
            formTitle="Edit Task"
            initialData={selectedTask}
            onCancel={() => setSelectedTask(null)}
            onSubmit={handleEditTask}
          />
        )}
      </Modal>
    </>
  );
}
