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

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.tasks.items);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const todoTasks = items.filter((t) => t.status === "todo");
  const progressTasks = items.filter((t) => t.status === "progress");
  const doneTasks = items.filter((t) => t.status === "done");

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

  return (
    <>
      <div className="min-h-screen p-2">
        <div className="flex justify-end px-6 pt-6">
          <button
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            + Create Task
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-center text-gray-700 mb-4 font-bold">TODO</h2>
            {todoTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(task)}
                onDelete={() => dispatch(removeTask(task.id))}
              />
            ))}
          </div>

          <div className="bg-blue-100 rounded-lg p-4">
            <h2 className="text-center text-blue-700 mb-4 font-bold">
              IN PROGRESS
            </h2>
            {progressTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(task)}
                onDelete={() => dispatch(removeTask(task.id))}
              />
            ))}
          </div>

          <div className="bg-green-100 rounded-lg p-4">
            <h2 className="text-center text-green-700 mb-4 font-bold">DONE</h2>
            {doneTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(task)}
                onDelete={() => dispatch(removeTask(task.id))}
              />
            ))}
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
