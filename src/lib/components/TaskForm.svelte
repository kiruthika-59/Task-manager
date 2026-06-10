<script lang="ts">
    import type { Task } from "$lib/types/task";

    type TaskInput = {
        title: string;
        description: string;
        priority: "High" | "Medium" | "Low";
        dueDate: string;
    };

    let {
        task = null,
        onSubmit,
        buttonText = "Add Task",
    } = $props<{
        task?: Task | null;
        onSubmit: (task: TaskInput) => void;
        buttonText?: string;
    }>();

    let title = $state("");
    let description = $state("");
    let priority = $state<"High" | "Medium" | "Low">("Medium");
    let dueDate = $state("");

    $effect(() => {
        if (task) {
            title = task.title;
            description = task.description;
            priority = task.priority;
            dueDate = task.dueDate;
        } else {
            title = "";
            description = "";
            priority = "Medium";
            dueDate = "";
        }
    });

    function handleSubmit() {
        if (!title.trim()) return;

        onSubmit({
            title,
            description,
            priority,
            dueDate,
        });

        if (!task) {
            title = "";
            description = "";
            priority = "Medium";
            dueDate = "";
        }
    }
</script>

<div class="form">
    <h2>
        {task ? "Edit Task" : "Create Task"}
    </h2>

    <input bind:value={title} placeholder="Task title" />

    <textarea bind:value={description} placeholder="Task description"></textarea>

    <div class="row">
        <select bind:value={priority}>
            <option> High </option>
            <option> Medium </option>
            <option> Low </option>
        </select>

        <input type="date" bind:value={dueDate} />
    </div>

    <button onclick={handleSubmit}>
        {buttonText}
    </button>
</div>

<style>
    .form {
        background: white;
        padding: 24px;
        border-radius: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    h2 {
        margin: 0;
        color: #1e293b;
    }

    input,
    textarea,
    select {
        width: 100%;
        padding: 14px;
        border-radius: 12px;
        border: 1px solid #ddd;
        outline: none;
        font-size: 15px;
    }

    textarea {
        resize: none;
        min-height: 120px;
    }

    input:focus,
    textarea:focus,
    select:focus {
        border-color: #2563eb;
    }

    .row {
        display: flex;
        gap: 14px;
    }

    button {
        border: none;
        cursor: pointer;
        padding: 14px;
        border-radius: 12px;
        background: #2563eb;
        color: white;
        font-size: 16px;
        font-weight: 600;
        transition: 0.2s;
    }

    button:hover {
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .row {
            flex-direction: column;
        }
    }
</style>
