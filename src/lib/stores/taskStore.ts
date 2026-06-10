import { writable } from "svelte/store";
import type { Task } from "$lib/types/task";

const storedTasks =
    typeof localStorage !==
        "undefined" ? JSON.parse( localStorage.getItem("tasks" ) || "[]") : [];

function createTaskStore() {
    const { subscribe, update } =
        writable<Task[]>(
            storedTasks
        );

    return {
        subscribe,
        addTask: (
            task: Task
        ) =>
            update((tasks) => {
                const updated = [...tasks,task];
                localStorage.setItem("tasks", JSON.stringify(updated));
                return updated;
            }),

        deleteTask: (id: string ) =>
            update((tasks) => {const updated =
                    tasks.filter((task) => task.id !==id );
                localStorage.setItem("tasks",JSON.stringify(updated));
                return updated;
            }),
        updateStatus: (id: string,
            status:
                | "To-Do"
                | "In Progress"
                | "Done"
        ) =>
            update((tasks) => {
                const updated =tasks.map((task) =>task.id === id ? {...task,status}: task);
                localStorage.setItem("tasks", JSON.stringify(updated));
                return updated;
            }),

        updateTask: (
            id: string,
            updatedTask:
                Partial<Task>
        ) =>
            update((tasks) => {
                const updated =tasks.map(
                        (task) =>task.id ===id? {...task,...updatedTask}: task
                    );

                localStorage.setItem("tasks", JSON.stringify(updated));
                return updated;
            })
    };
}

export const taskStore =
    createTaskStore();