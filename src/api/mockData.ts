import type { Task } from "../types/Task";
import type { User } from "../types/User";

export const users: User[] = [
  {
    id: 1,
    name: "Aymen Abdelmalik Bounab",
  },
  {
    id: 2,
    name: "Nadjmeddine Ahmed",
  },
  {
    id: 3,
    name: "Mokhtar Zeghba",
  },
  {
    id: 4,
    name: "Meziane Brahimi",
  },
];

export const tasks: Task[] = [
  {
    id: 1,
    title: "Design login page",
    description: "Create a responsive login page based on the Figma design.",
    status: "todo",
    priority: "high",
    assignedTo: "Aymen Abdelmalik Bounab",
    createdAt: "2026-06-20",
  },
  {
    id: 2,
    title: "Implement authentication API",
    description: "Develop JWT-based authentication endpoints.",
    status: "progress",
    priority: "high",
    assignedTo: "Nadjmeddine Ahmed",
    createdAt: "2026-06-18",
  },
  {
    id: 3,
    title: "Write unit tests",
    description: "Add unit tests for the task service layer.",
    status: "todo",
    priority: "medium",
    assignedTo: "Nadjmeddine Ahmed",
    createdAt: "2026-06-21",
  },
  {
    id: 4,
    title: "Fix dashboard layout",
    description: "Resolve responsive layout issues on tablet devices.",
    status: "done",
    priority: "medium",
    assignedTo: "Aymen Abdelmalik Bounab",
    createdAt: "2026-06-15",
  },
  {
    id: 5,
    title: "Optimize database queries",
    description: "Reduce response time for task retrieval endpoints.",
    status: "progress",
    priority: "high",
    assignedTo: "Aymen Abdelmalik Bounab",
    createdAt: "2026-06-17",
  },
  {
    id: 6,
    title: "Update project documentation",
    description: "Document API endpoints and project setup instructions.",
    status: "done",
    priority: "low",
    assignedTo: "Mokhtar Zeghba",
    createdAt: "2026-06-14",
  },
  {
    id: 7,
    title: "Create user profile page",
    description: "Build the profile page with editable user information.",
    status: "todo",
    priority: "medium",
    assignedTo: "Aymen Abdelmalik Bounab",
    createdAt: "2026-06-22",
  },
  {
    id: 8,
    title: "Configure CI/CD pipeline",
    description: "Set up automated build and deployment workflow.",
    status: "progress",
    priority: "high",
    assignedTo: "Mokhtar Zeghba",
    createdAt: "2026-06-19",
  },
  {
    id: 9,
    title: "Refactor task components",
    description: "Improve component structure and remove duplicated code.",
    status: "done",
    priority: "medium",
    assignedTo: "Meziane Brahimi",
    createdAt: "2026-06-16",
  },
  {
    id: 10,
    title: "Review accessibility issues",
    description: "Ensure the application meets WCAG accessibility standards.",
    status: "todo",
    priority: "low",
    assignedTo: "Aymen Abdelmalik Bounab",
    createdAt: "2026-06-23",
  },
];
