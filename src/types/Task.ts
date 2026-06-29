export interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "progress" | "done";
  priority: "low" | "medium" | "high";
  assignedTo: string;
  createdAt: string;
}
