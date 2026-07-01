import { useState } from "react";
import type { CreateTaskRequest } from "../api/requests/TaskRequests";
import type { Task } from "../types/Task";
import { users } from "../api/mockData";

interface TaskFormProps {
  formTitle?: string;
  initialData?: Task;
  onSubmit: (data: CreateTaskRequest) => void;
  onCancel: () => void;
}

export default function TaskForm({
  formTitle,
  initialData,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [titleError, setTitleError] = useState<string | null>(null);
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [priority, setPriority] = useState<Task["priority"]>(
    initialData?.priority ?? "low",
  );
  const [status, setStatus] = useState<Task["status"]>(
    initialData?.status ?? "todo",
  );
  const [assignedTo, setAssignedTo] = useState(
    initialData?.assignedTo ?? users[0].name,
  );

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (titleError) setTitleError(null);
  }

  function onDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (title.trim().length < 3) {
      setTitleError("Title must be at least 3 characters.");
      return;
    }

    onSubmit({ title, description, priority, status, assignedTo });
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        {formTitle ?? "Task"}
      </h2>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor="title"
      >
        Title
      </label>
      <input
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="title"
        type="text"
        value={title}
        required
        onChange={onTitleChange}
      />
      {titleError && <p className="text-red-500 text-xs mt-1">{titleError}</p>}

      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="description"
      >
        Description
      </label>
      <textarea
        className="w-full h-24 resize-none mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="description"
        value={description}
        required
        onChange={onDescriptionChange}
      />

      <div className="flex justify-between mb-4">
        <p>Priority</p>

        <div className="flex items-center gap-1">
          <input
            className="mr-1"
            name="priority"
            id="low"
            type="radio"
            value="low"
            checked={priority === "low"}
            onChange={() => setPriority("low")}
          />
          <label className="text-sm text-gray-700" htmlFor="low">
            Low
          </label>
        </div>

        <div className="flex items-center gap-1">
          <input
            className="mr-1"
            name="priority"
            id="medium"
            type="radio"
            value="medium"
            checked={priority === "medium"}
            onChange={() => setPriority("medium")}
          />
          <label className="text-sm text-gray-700" htmlFor="medium">
            Medium
          </label>
        </div>

        <div className="flex items-center gap-1">
          <input
            className="mr-1"
            name="priority"
            id="high"
            type="radio"
            value="high"
            checked={priority === "high"}
            onChange={() => setPriority("high")}
          />
          <label className="text-sm text-gray-700" htmlFor="high">
            High
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="status"
        >
          Status
        </label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
        >
          <option value="todo">Todo</option>
          <option value="progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="mb-8">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="assignedTo"
        >
          Assigned to
        </label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="assignedTo"
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end items-center gap-4">
        <button
          className="bg-red-600 text-white rounded px-6 py-2 cursor-pointer"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white rounded px-6 py-2 cursor-pointer"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}
