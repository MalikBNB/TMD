import type { Task } from "../types/Task";
import { tasks as initialTasks } from "./mockData";
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
} from "./requests/TaskRequests";

let taskDb: Task[] = [...initialTasks];

class TaskService {
  private delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async getTasks(): Promise<Task[]> {
    await this.delay(800);

    return [...taskDb];
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    await this.delay(600);
    return taskDb.find((t) => t.id === id);
  }

  async createTask(task: CreateTaskRequest): Promise<Task> {
    await this.delay(600);

    const newTask: Task = {
      ...task,
      id: taskDb.length > 0 ? taskDb[taskDb.length - 1].id + 1 : 1,
      createdAt: new Date().toISOString(),
    };

    taskDb.push(newTask);
    return { ...newTask };
  }

  async updateTask(id: number, updates: UpdateTaskRequest): Promise<Task> {
    await this.delay(600);

    const index = taskDb.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Task with id:${id} not found.`);
    }

    taskDb[index] = { ...taskDb[index], ...updates };

    return { ...taskDb[index] };
  }

  async deleteTask(id: number): Promise<void> {
    await this.delay(600);

    const index = taskDb.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Task with id:${id} not found.`);
    }

    taskDb.splice(index, 1);
  }
}

export const taskService = new TaskService();
