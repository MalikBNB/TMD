import type { Task } from "../types/Task";
import { tasks } from "./mockData";
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
} from "./requests/TaskRequests";

class TaskService {
  private delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async getTasks(): Promise<Task[]> {
    await this.delay(800);

    return tasks;
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    await this.delay(600);
    return tasks.find((t) => t.id === id);
  }

  async createTask(task: CreateTaskRequest): Promise<Task> {
    await this.delay(600);

    const newTask: Task = {
      ...task,
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: number, updates: UpdateTaskRequest): Promise<Task> {
    await this.delay(600);

    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Task with id:${id} not found.`);
    }

    tasks[index] = { ...tasks[index], ...updates };

    return tasks[index];
  }

  async deleteTask(id: number): Promise<void> {
    await this.delay(600);

    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Task with id:${id} not found.`);
    }

    tasks.splice(index, 1);
  }
}

export const taskService = new TaskService();
