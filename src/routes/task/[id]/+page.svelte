<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { taskStore } from "$lib/stores/taskStore";
    import Button from "$lib/components/Button.svelte";
    import { PRIORITIES, TASK_STATUS } from "$lib/constants/task";
    import PriorityBadge from "$lib/components/PriorityBadge.svelte";
    import { toast } from "svelte-sonner";

    const today = new Date().toISOString().split("T")[0];
    const id = page.params.id;
    let task = $derived($taskStore.find((task) => task.id === id));
    let editMode = $state(false);
    let title = $state("");
    let description = $state("");
    let priority = $state<(typeof PRIORITIES)[number]>("Medium");
    let status = $state<(typeof TASK_STATUS)[number]>("To-Do"); 
    let dueDate = $state("");

    const nextStatus = $derived.by(() => {
        if (!task) return TASK_STATUS[0];

        switch (task.status) {
            case "To-Do":
                return "In Progress";
            case "In Progress":
                return "Done";
            default:
                return "";
        }
    });

    function reopenTask() {
        if (!task) return;
        taskStore.updateTask(task.id, {
            status: "To-Do",
            reopened: true,
        });
        toast.success("Task reopened");
    }

    function closeTask() {
        if (!task) return;
        taskStore.updateTask(task.id, {
            closed: true,
            closedAt: new Date().toISOString(),
        });
        toast.success("Task moved to history");
        goto("/history");
    }

    function startEdit() {
        if (!task || task.closed || task.status === "Done") return;
        title = task.title;
        description = task.description;
        priority = task.priority;
        status = task.status;
        dueDate = task.dueDate;
        editMode = true;
    }

    function getStatusClass(status: string) {
        switch (status) {
            case "To-Do":
                return "todo";
            case "In Progress":
                return "progress";
            case "Done":
                return "done";
            default:
                return "";
        }
    }

    function saveTask() {
        if (!task || task.closed || task.status === "Done") return;
        taskStore.updateTask(task.id, {
            title,
            description,
            priority,
            status,
            dueDate,
        });
        editMode = false;
        toast.success("Task updated successfully");
    }

    function deleteTask() {
        if (!task) return;
        const confirmDelete = confirm("Delete this task?");
        if (!confirmDelete) return;
        taskStore.deleteTask(task.id);
        toast.success("Task deleted successfully");
        goto("/");
    }

    function updateTaskStatus() {
        if (!task) return;
        const newStatus = task.status === "To-Do" ? "In Progress" : "Done";
        taskStore.updateStatus(task.id, newStatus);
        toast.success(`Moved to ${newStatus}`);
    }

    $effect(() => {
        console.log("TASK STORE", $taskStore);
    });
</script>

{#if task}
    <div class="container">
        <Button label="← Back" variant="back" onclick={() => goto("/")} />

        <div class="task-card">
            {#if editMode}
                <div class="edit-form">
                    <h2>Edit Task</h2>
                    <input bind:value={title} placeholder="Task title" />
                    <textarea bind:value={description} placeholder="Description"></textarea>

                    <div class="row">
                        <select bind:value={priority}>
                            {#each PRIORITIES as item}
                                <option value={item}>
                                    {item}
                                </option>
                            {/each}
                        </select>

                        <select bind:value={status}>
                            {#each TASK_STATUS as item}
                                <option value={item}>
                                    {item}
                                </option>
                            {/each}
                        </select>

                        <input type="date" bind:value={dueDate} min={today} />
                    </div>

                    <div class="actions">
                        <Button
                            label={task?.closed || task?.status === "Done"? "Cannot Save": "Save Changes"}
                            variant="save"
                            onclick={saveTask}
                            disabled={task?.closed || task?.status === "Done"}
                        />

                        <Button
                            label={task?.closed || task?.status === "Done"? "Locked": "Cancel"}
                            variant="cancel"
                            onclick={() => (editMode = false)}
                            disabled={task?.closed || task?.status === "Done"}
                        />
                    </div>
                </div>
            {:else}
                <div class="top">
                    <h1>{task.title}</h1>
                    <PriorityBadge priority={task.priority} />
                </div>

                <p class="description">
                    {task.description}
                </p>

                <div class="details">
                    <div>
                        <strong>Status:</strong>
                        <span class={getStatusClass(task.status)}>
                            {task.status}
                        </span>
                    </div>

                    <div>
                        <strong>Due Date:</strong>
                        {task.dueDate || "Not set"}
                    </div>

                    <div>
                        <strong>Created:</strong>
                        {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                </div>

                <div class="actions">
                    {#if !task.closed && task.status !== "Done"}
                        <Button
                            label={`Move to ${nextStatus}`}
                            variant="primary"
                            onclick={updateTaskStatus}
                        />

                        <Button
                            label="Edit"
                            variant="edit"
                            onclick={startEdit}
                        />

                        <Button
                            label="Delete"
                            variant="delete"
                            onclick={deleteTask}
                        />
                    {/if}

                    {#if !task.closed && task.status === "Done"}
                        <Button
                            label="Reopen Task"
                            variant="edit"
                            onclick={reopenTask}
                        />

                        <Button
                            label="Close Task"
                            variant="primary"
                            onclick={closeTask}
                        />
                    {/if}

                    {#if task.closed}
                        <Button
                            label="Task Archived"
                            variant="primary"
                            disabled
                        />
                    {/if}
                </div>
            {/if}
        </div>
    </div>
{:else}
    <div class="not-found">
        <h1>Task Not Found</h1>
        <p>This task may have been deleted.</p>
        <button onclick={() => goto("/")}> Back Home </button>
    </div>
{/if}

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :global(body) {
        font-family: Inter, sans-serif;
        background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f8fafc 100%);
        min-height: 100vh;
    }

    .container {
        width: 92%;
        max-width: 1000px;
        margin: 40px auto;
    }

    .action-btn:disabled {
        cursor: not-allowed;
        opacity: 0.65;
        background: #e5e7eb;
        color: #94a3b8;
        border: 1px solid #cbd5e1;
        transform: none;
        box-shadow: none;
    }

    .action-btn:disabled:hover {
        transform: none;
        box-shadow: none;
    }

    .task-card {
        margin-top: 24px;
        background: rgba(255, 255, 255, 0.88);
        backdrop-filter: blur(20px);
        border-radius: 32px;
        padding: 36px;
        border: 1px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
        margin-bottom: 28px;
    }

    .top h1 {
        font-size: 2.3rem;
        font-weight: 800;
        color: #0f172a;
        line-height: 1.3;
    }

    .description {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 24px;
        padding: 24px;
        margin-bottom: 28px;
        line-height: 1.9;
        color: #475569;
        font-size: 15px;
    }

    .details {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
    }

    .details div {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 22px;
        padding: 22px;
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
    }

    .details strong {
        display: block;
        margin-bottom: 10px;
        font-size: 13px;
        color: #64748b;
        font-weight: 600;
    }

    .todo,
    .progress,
    .done {
        display: inline-flex;
        align-items: center;
        padding: 8px 14px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 700;
    }

    .todo {
        background: #e2e8f0;
        color: #475569;
    }

    .progress {
        background: #fef3c7;
        color: #b45309;
    }

    .done {
        background: #dcfce7;
        color: #15803d;
    }

    .actions {
        display: flex;
        gap: 14px;
        margin-top: 32px;
        flex-wrap: wrap;
    }

    .action-btn {
        border: none;
        outline: none;
        cursor: pointer;
        padding: 14px 20px;
        border-radius: 18px;
        font-size: 14px;
        font-weight: 600;
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 50px;
    }

    .primary {
        background: #2563eb;
        color: white;
        box-shadow: 0 10px 20px rgba(37, 99, 235, 0.22);
    }

    .primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 24px rgba(37, 99, 235, 0.28);
    }
    .edit-btn {
        background: #f8fafc;
        color: #334155;
        border: 1px solid #e2e8f0;
    }

    .edit-btn:hover {
        background: #eef2ff;
    }
    .delete-btn {
        background: rgba(239, 68, 68, 0.08);
        color: #dc2626;
    }

    .delete-btn:hover {
        background: rgba(239, 68, 68, 0.14);
    }
    @media (max-width: 768px) {
        .actions {
            flex-direction: column;
        }

        .action-btn {
            width: 100%;
        }
    }
    .edit-form h2 {
        font-size: 1.7rem;
        margin-bottom: 24px;
        color: #0f172a;
    }

    input,
    textarea,
    select {
        width: 100%;
        padding: 18px;
        border-radius: 18px;
        border: 1px solid #dbeafe;
        outline: none;
        background: white;
        transition: 0.25s ease;
    }

    input:focus,
    textarea:focus,
    select:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    }

    textarea {
        min-height: 150px;
        resize: none;
    }

    .row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-top: 16px;
    }
    .not-found {
        width: 92%;
        max-width: 700px;
        margin: 100px auto;
        text-align: center;
        background: white;
        border-radius: 32px;
        padding: 70px 40px;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
    }

    .not-found h1 {
        font-size: 2rem;
        margin-bottom: 14px;
    }

    .not-found p {
        color: #64748b;
        margin-bottom: 24px;
    }

    @media (max-width: 768px) {
        .container {
            width: 94%;
        }

        .top {
            flex-direction: column;
        }

        .top h1 {
            font-size: 1.8rem;
        }

        .details,
        .row {
            grid-template-columns: 1fr;
        }

        .actions {
            flex-direction: column;
        }

        .actions :global(button) {
            width: 100%;
        }

        .task-card {
            padding: 24px;
        }
    }
</style>
