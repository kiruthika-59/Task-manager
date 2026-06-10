<script lang="ts">
    import type { Task } from "$lib/types/task";
    import { taskStore } from "$lib/stores/taskStore";
    import { goto } from "$app/navigation";
    import Button from "./Button.svelte";

    let { task } = $props<{
        task: Task;
    }>();
</script>

<div class="task-card">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p class="status">
        Status:
        <span class={task.status ? "completed" : "pending"}>
            {task.status ? "Completed" : "Pending"}
        </span>
    </p>

    <div class="actions">
        <Button
            label="Toggle Status"
            variant="toggle"
            onclick={() =>
                taskStore.updateStatus( task.id,
                    task.status === "To-Do" ? "In Progress" : "Done",
                )}
        />

        <Button
            label="View"
            variant="view"
            onclick={() => goto(`/task/${task.id}`)}
        />

        <Button
            label="Delete"
            variant="delete"
            onclick={() => taskStore.deleteTask(task.id)}
        />
    </div>
</div>

<style>
    .task-card {
        background: white;
        border-radius: 18px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: 0.3s;
    }

    .task-card:hover {
        transform: translateY(-5px);
    }

    h3 {
        color: #1e293b;
        margin-bottom: 10px;
    }

    p {
        color: #555;
        margin-bottom: 10px;
        line-height: 1.5;
    }

    .status {
        font-weight: bold;
    }

    .actions {
        display: flex;
        gap: 10px;
        margin-top: 18px;
        flex-wrap: wrap;
    }
</style>
