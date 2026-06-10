<script lang="ts">
  import { taskStore } from "$lib/stores/taskStore";
  import Button from "$lib/components/Button.svelte";
  import { filterTasks } from "$lib/utils/taskFilter";
  import { PRIORITIES, TASK_STATUS } from "$lib/constants/task";
  import SearchBar from "$lib/components/SearchBar.svelte";
  import PriorityBadge from "$lib/components/PriorityBadge.svelte";
  import { Pencil } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  import StatsCards from "$lib/components/StatsCards.svelte";

  let title = $state("");
  let description = $state("");
  let search = $state("");
  let priority = $state<(typeof PRIORITIES)[number]>("Medium");
  const today = new Date().toISOString().split("T")[0];
  let dueDate = $state("");
  let editMode = $state(false);
  let editTaskId = $state("");

  let errors = $state({
    title: "",
    dueDate: "",
  });

  function validateForm() {
    errors = {
      title: "",
      dueDate: "",
    };

    let isValid = true;

    if (!title.trim()) {
      errors.title = "Task title is required";
      isValid = false;
    } else if (title.trim().length < 3) {
      errors.title = "Minimum 3 characters required";
      isValid = false;
    }

    if (!dueDate) {
      errors.dueDate = "Due date is required";
      isValid = false;
    }
    return isValid;
  }

  function addTask() {
    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }

    if (editMode) {
      taskStore.updateTask(editTaskId, {
        title,
        description,
        priority,
        dueDate,
        status: TASK_STATUS[0],
      });
      editMode = false;
      editTaskId = "";
      toast.success("Task updated successfully");
    } else {
      taskStore.addTask({
        id: crypto.randomUUID(),
        title,
        description,
        status: TASK_STATUS[0],
        createdAt: new Date().toISOString(),
        priority,
        dueDate,
      });
      toast.success("Task added successfully");
    }
    clearForm();
  }
  function editTask(task: any) {
    title = task.title;
    description = task.description;
    priority = task.priority;
    dueDate = task.dueDate;
    editMode = true;
    editTaskId = task.id;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function clearForm() {
    title = "";
    description = "";
    dueDate = "";
    priority = "Medium";
    errors = {
      title: "",
      dueDate: "",
    };
  }

  let filteredTasks = $derived(filterTasks($taskStore, search));

  let recentTasks = $derived(
    filteredTasks
      .filter((task) => !task.closed)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 3),
  );
</script>

<StatsCards />
<div class="form">
  <h2>
    {editMode ? "Edit Task" : "Create Task"}
  </h2>

  <div class="field">
    <input
      id="title"
      bind:value={title}
      placeholder=" "
      oninput={() => (errors.title = "")}
    />

    <label for="title">Task Title</label>
    {#if errors.title}
      <span class="error">{errors.title}</span>
    {/if}
  </div>

  <div class="field">
    <textarea id="description" bind:value={description} placeholder=" "
    ></textarea>
    <label for="description"> Description </label>
  </div>

  <div class="row">
    <div class="field">
      <select id="priority" bind:value={priority}>
        {#each PRIORITIES as item}
          <option value={item}>
            {item}
          </option>
        {/each}
      </select>
      <label for="priority"> Priority </label>
    </div>

    <div class="field">
      <input
        id="due-date"
        type="date"
        bind:value={dueDate}
        min={today}
        placeholder=" "
        oninput={() => (errors.dueDate = "")}
      />

      <label for="due-date">Due Date</label>

      {#if errors.dueDate}
        <span class="error">{errors.dueDate}</span>
      {/if}
    </div>
  </div>

  <div class="button-wrapper">
    <Button label={editMode ? "Update Task" : "Add Task"} onclick={addTask} />
  </div>
</div>

<SearchBar bind:value={search} placeholder="Search your tasks..." />
{#if recentTasks.length === 0}
  <div class="empty">
    <h2>No Tasks Found</h2>
    <p>Create your first task</p>
  </div>
{:else}
  <h2 class="recent-title">Recently Added Tasks</h2>

  <div class="task-grid">
    {#each recentTasks as task}
      <div class="task-card">
        <div class="card-header">
          <div class="title-section">
            <h3>{task.title}</h3>
            <PriorityBadge priority={task.priority} />
          </div>

          <button
            class="edit-icon"
            onclick={() => editTask(task)}
            aria-label="Edit task"
          >
            <Pencil size={18}></Pencil>
          </button>
        </div>

        <div class="card-footer">
          <div class="meta-item">
            <span class="label-meta"> Status </span>

            <span
              class={`status-pill ${task.status.toLowerCase().replace(" ", "-")}`}
            >
              {task.status}
            </span>
          </div>

          <div class="meta-item align-right">
            <span class="label-meta"> Due Date </span>
            <span class="date">
              {task.dueDate || "No date"}
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    margin: 0;
    font-family: Inter, sans-serif;
    background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f8fafc 100%);
    min-height: 100vh;
  }

  .error {
    display: block;
    margin-top: 4px;
    color: #ef4444;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 24px;
  }

  .sidebar {
    width: 300px;
    min-width: 300px;
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
    color: white;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.12);
  }

  .sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 19px;
  }

  .subtitle {
    color: #cbd5e1;
    font-size: 14px;
    line-height: 1.8;
  }

  .sidebar-actions {
    margin-top: auto;
  }

  .sidebar-actions :global(button) {
    width: 100%;
    border-radius: 15px;
  }

  .main-content {
    flex: 1;
    padding: 40px;
    overflow-x: hidden;
    padding-top: 24px;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    padding: 28px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
    cursor: pointer;
  }

  .stat-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);
  }
  .form {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px);
    border-radius: 28px;
    padding: 34px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 14px 45px rgba(15, 23, 42, 0.08);
    margin-bottom: 30px;
  }

  .form h2 {
    font-size: 1.6rem;
    color: #0f172a;
    margin-bottom: 24px;
  }

  .field {
    position: relative;
    margin-bottom: 22px;
  }

  .field input,
  .field textarea,
  .field select {
    width: 100%;
    border: 1.5px solid #dbeafe;
    border-radius: 18px;
    outline: none;
    background: rgba(255, 255, 255, 0.96);
    color: #0f172a;
    font-size: 15px;
    transition: 0.3s ease;
  }

  .field input,
  .field select {
    height: 58px;
    padding: 24px 16px 10px;
  }

  .field textarea {
    min-height: 140px;
    resize: none;
    padding: 28px 16px 16px;
  }

  .field input:focus,
  .field textarea:focus,
  .field select:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.12);
  }

  .field label {
    position: absolute;
    left: 16px;
    top: 18px;
    background: white;
    padding: 0 8px;
    color: #64748b;
    font-size: 14px;
    pointer-events: none;
    transition: 0.25s ease;
  }

  .field input:focus + label,
  .field input:not(:placeholder-shown) + label,
  .field textarea:focus + label,
  .field textarea:not(:placeholder-shown) + label,
  .field select:focus + label,
  .field select:valid + label,
  .field input[type="date"]:valid + label {
    top: -10px;
    font-size: 12px;
    color: #2563eb;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
  }

  .search {
    width: 100%;
    margin-bottom: 30px;
    padding: 18px 20px;
    border-radius: 18px;
    border: 1px solid #dbeafe;
    outline: none;
    background: white;
    font-size: 15px;
    transition: 0.3s ease;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
  }

  .search:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.12);
  }

  .recent-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 22px;
  }

  .task-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: stretch;
  }

  .task-card {
    background: white;
    border-radius: 24px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180px;
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .task-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  .title-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .title-section h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    flex-direction: row;
    gap: 12px;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label-meta {
    font-size: 12px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
  }

  .date {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
  }
  .edit-icon {
    width: 42px;
    height: 42px;
    border: none;
    border-radius: 14px;
    background: #f8fafc;
    color: #475569;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.25s ease;
    flex-shrink: 0;
  }

  .edit-icon:hover {
    background: #e2e8f0;
    transform: scale(1.05);
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 18px;
    border-top: 1px solid #f1f5f9;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .align-right {
    text-align: right;
  }

  .label-meta {
    color: #94a3b8;
    font-size: 12px;
    font-weight: 600;
  }

  .date {
    color: #334155;
    font-size: 14px;
    font-weight: 500;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
  }

  .to-do {
    background: #e2e8f0;
    color: #475569;
  }

  .in-progress {
    background: #fef3c7;
    color: #b45309;
  }

  .done {
    background: #dcfce7;
    color: #15803d;
  }

  .empty {
    text-align: center;
    background: white;
    border-radius: 24px;
    padding: 50px;
  }

  @media (max-width: 900px) {
    .main-content {
      padding: 20px;
    }

    .row,
    .actions {
      grid-template-columns: 1fr;
    }

    .top,
    .meta {
      flex-direction: column;
      gap: 14px;
    }

    .button-wrapper {
      justify-content: center;
    }

    .button-wrapper :global(button),
    .sidebar-actions :global(button) {
      width: 90%;
    }

    .task-card {
      padding: 20px;
    }

    .form {
      padding: 24px;
    }
  }

  @media (max-width: 1100px) {
    .task-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .task-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .task-card {
      min-height: auto;
      padding: 18px;
    }

    .layout {
      display: flex;
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      min-width: unset;
      height: auto;
      position: relative;
      top: unset;
      margin: 0;
      padding: 20px;
      border-radius: 0 0 24px 24px;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
    }

    .sidebar-top {
      text-align: center;
      margin-bottom: 18px;
    }

    .subtitle {
      font-size: 13px;
      line-height: 1.6;
      max-width: 260px;
      margin: 0 auto;
      color: #cbd5e1;
    }

    .sidebar-actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .sidebar-actions :global(button) {
      width: 100%;
      height: 48px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 600;
    }
    .main-content {
      width: 100%;
      padding: 16px;
    }

    .task-grid {
      grid-template-columns: 1fr;
    }

    .row {
      grid-template-columns: 1fr;
    }

    .button-wrapper {
      justify-content: center;
    }

    .button-wrapper :global(button) {
      width: 100%;
    }

    .form {
      padding: 22px;
    }
  }

  .sidebar-stats {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .mini-stat {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: 0.25s ease;
  }

  .mini-stat:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.12);
  }

  .icon-box {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 769px) and (max-width: 1100px) {
    .layout {
      grid-template-columns: 240px 1fr;
      gap: 18px;
    }

    .sidebar {
      width: 240px;
      min-width: 240px;
      padding: 20px 16px;
    }

    .subtitle {
      font-size: 13px;
    }

    .sidebar-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  .sidebar-divider {
    height: 1px;
    margin: 18px 0;
    background: rgba(255, 255, 255, 0.08);
  }
</style>
