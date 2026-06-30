export interface CreateTaskRequest {
  title: string;
  description: string;
  status: "todo" | "progress" | "done";
  priority: "low" | "medium" | "high";
  assignedTo: string;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  status: "todo" | "progress" | "done";
  priority: "low" | "medium" | "high";
  assignedTo: string;
}
