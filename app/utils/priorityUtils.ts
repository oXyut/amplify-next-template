import { Priority } from "../types/priority";

export const getPriorityClasses = (priority: Priority) => {
  const priorityMap = {
    [Priority.Critical]: {
      indicator: "bg-red-500 dark:bg-red-400",
      border: "border-l-priority-critical-border dark:border-l-priority-critical-border",
    },
    [Priority.High]: {
      indicator: "bg-orange-500 dark:bg-orange-400",
      border: "border-l-priority-high-border dark:border-l-priority-high-border",
    },
    [Priority.Medium]: {
      indicator: "bg-yellow-500 dark:bg-yellow-400",
      border: "border-l-priority-medium-border dark:border-l-priority-medium-border",
    },
    [Priority.Low]: {
      indicator: "bg-blue-500 dark:bg-blue-400",
      border: "border-l-priority-low-border dark:border-l-priority-low-border",
    },
  } as const;

  return priorityMap[priority];
}; 