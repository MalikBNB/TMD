import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Task } from "../types/Task";
import { taskService } from "../api/taskService";
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
} from "../api/requests/TaskRequests";

interface TaskState {
  items: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface EditTaskPayload {
  id: number;
  updates: UpdateTaskRequest;
}

const initialState: TaskState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const tasks = await taskService.getTasks();
  return tasks;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (newTask: CreateTaskRequest) => {
    const task = await taskService.createTask(newTask);
    return task;
  },
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, updates }: EditTaskPayload) => {
    const task = await taskService.updateTask(id, updates);
    return task;
  },
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id: number) => {
    await taskService.deleteTask(id);
    return id;
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch tasks.";
      })

      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to add new task.";
      })

      .addCase(editTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed updating task.";
      })

      .addCase(removeTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed removing task.";
      });
  },
});

export default tasksSlice.reducer;
