import type {PRIORITIES, TASK_STATUS} from "$lib/constants/task";

export type Task = {
    id: string;
    title: string;
    description: string;
    status: (typeof TASK_STATUS)[number];
    createdAt: string;
    priority: (typeof PRIORITIES)[number];
    dueDate: string;
    reopened?: boolean;
    closed?: boolean;
    closedAt?: string;
};