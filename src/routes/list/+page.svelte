<script lang="ts">
  import { goto } from "$app/navigation";
  import { taskStore } from "$lib/stores/taskStore";
  import { filterTasks } from "$lib/utils/taskFilter";
  import SearchBar from "$lib/components/SearchBar.svelte";
  import { EllipsisVertical, Pencil, Trash2 } from "lucide-svelte";
  import PriorityBadge from "$lib/components/PriorityBadge.svelte";
  import { toast } from "svelte-sonner";
  import Header from "$lib/components/Header.svelte";
  import EmptyState from "$lib/components/EmptyState.svelte";
  import Pagination from "$lib/components/Pagination.svelte";

  let search = $state("");
  let filteredTasks = $derived(filterTasks($taskStore, search));
  let activeMenu = $state<string | null>(null);

  const ITEMS_PER_PAGE = 5;
  let currentPage = $state(1);
  const activeTasks = $derived(filteredTasks.filter((task) => !task.closed));
  let totalPages = $derived(Math.ceil(activeTasks.length / ITEMS_PER_PAGE));

  let paginatedTasks = $derived(
    activeTasks.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    ),
  );

  $effect(() => {
    search;
    currentPage = 1;
  });

  $effect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    }
  });

  function toggleMenu(taskId: string) {
    activeMenu = activeMenu === taskId ? null : taskId;
  }

  function changeStatus(task: any) {
    if (task.status === "Done") return;
    const updatedStatus = task.status === "To-Do" ? "In Progress" : "Done";
    taskStore.updateTask(task.id, { ...task, status: updatedStatus });
    toast.success(`Task moved to ${updatedStatus}`);
  }

  function deleteTask(taskId: string) {
    taskStore.deleteTask(taskId);
    toast.success("Task deleted successfully");
  }
</script>

<div class="container">
  <Header
    label="TASK MANAGEMENT"
    title="Task List"
    subtitle="View, manage and update your tasks efficiently"
  />

  <SearchBar bind:value={search} />

  {#if activeTasks.length === 0}
    <EmptyState title="No Tasks Found" description="Create a task first." />
  {:else}
    <div class="task-list">
      <div class="task-header">
        <span>Task</span>
        <span>Priority</span>
        <span>Status</span>
        <span>Due Date</span>
        <span>Actions</span>
      </div>

      {#each paginatedTasks as task}
        <div class="task-row">
          <div class="task-info">
            <h3>{task.title}</h3>
          </div>

          <div class="center-cell">
            <PriorityBadge priority={task.priority} />
          </div>

          <div class="center-cell">
            <button
              class={`status-btn ${
                task.status === "To-Do"
                  ? "todo"
                  : task.status === "In Progress"
                    ? "progress"
                    : "done"
              }`}
              onclick={() => changeStatus(task)}
              disabled={task.status === "Done"}
            >
              {task.status}
            </button>
          </div>

          <div class="center-cell due-date">
            {task.dueDate || "No date"}
          </div>
          <div class="actions-menu">
            <button
              type="button"
              class="menu-btn"
              onclick={() => toggleMenu(task.id)}
            >
              <EllipsisVertical size={20}></EllipsisVertical>
            </button>

            {#if activeMenu === task.id}
              <div class="dropdown">
                <button type="button" onclick={() => goto(`/task/${task.id}`)}>
                  <Pencil size={16}></Pencil>
                  Edit
                </button>

                <button
                  type="button"
                  class="delete-option"
                  onclick={() => deleteTask(task.id)}
                >
                  <Trash2 size={16}></Trash2>
                  Delete
                </button>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    {#if totalPages > 1}
      <Pagination
        {currentPage}
        {totalPages}
        previous={() => {
          if (currentPage > 1) currentPage--;
        }}
        next={() => {
          if (currentPage < totalPages) currentPage++;
        }}
      />
    {/if}
  {/if}
</div>

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
    max-width: 1400px;
    margin: 32px auto;
  }

  :global(input) {
    width: 100%;
    padding: 16px 20px;
    border-radius: 18px;
    border: 1px solid #dbeafe;
    background: white;
    font-size: 15px;
    margin-bottom: 30px;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
    transition: 0.3s ease;
  }

  :global(input:focus) {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.12);
  }

  .task-list {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    overflow: visible;
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
  }

  .task-header,
  .task-row {
    display: grid;
    grid-template-columns: 3fr 1fr 1.2fr 1fr 0.7fr;
  }

  .task-header {
    padding: 14px 24px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    font-size: 13px;
    font-weight: 700;
    color: #64748b;
  }

  .task-header span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .task-header span:first-child {
    justify-content: flex-start;
  }

  .task-row {
    min-height: 64px;
    padding: 12px 24px;
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.2s ease;
  }

  .task-row:hover {
    background: rgba(59, 130, 246, 0.04);
  }

  .task-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .task-info h3 {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
  }

  .center-cell,
  .actions-menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .due-date {
    font-size: 13px;
    font-weight: 500;
    color: #64748b;
  }

  .status-btn {
    border: none;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    transition: 0.25s ease;
  }

  .status-btn:hover {
    transform: scale(1.05);
  }

  .status-btn:disabled {
    cursor: not-allowed;
    opacity: 0.85;
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

  .actions-menu {
    position: relative;
    min-width: 60px;
  }

  .menu-btn {
    border: none;
    background: #f8fafc;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.25s ease;
  }

  .menu-btn:hover {
    background: #e2e8f0;
    transform: scale(1.05);
  }

  .dropdown {
    position: absolute;
    top: 52px;
    right: 0;
    width: 160px;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(18px);
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
    overflow: hidden;
    z-index: 20;
  }

  .dropdown button {
    width: 100%;
    border: none;
    background: transparent;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.2s ease;
  }

  .dropdown button:hover {
    background: rgba(248, 250, 252, 0.9);
  }

  .delete-option {
    color: #ef4444;
  }

  @media (max-width: 900px) {
    .container {
      width: 94%;
      margin: 20px auto;
    }

    .task-header {
      display: none;
    }

    .task-list {
      background: transparent;
      border: none;
      box-shadow: none;
    }

    .task-row {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: rgba(255, 255, 255, 0.96);
      border-radius: 22px;
      padding: 20px;
      margin-bottom: 16px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    }

    .actions-menu {
      position: absolute;
      top: 12px;
      right: 5px;
      z-index: 10;
    }

    .menu-btn {
      width: 38px;
      height: 38px;
    }

    .task-info {
      padding-right: 50px;
    }

    .center-cell,
    .due-date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .center-cell:nth-child(2)::before {
      content: "Priority";
      font-size: 13px;
      font-weight: 700;
      color: #64748b;
    }

    .center-cell:nth-child(3)::before {
      content: "Status";
      font-size: 13px;
      font-weight: 700;
      color: #64748b;
    }

    .due-date::before {
      content: "Due Date";
      font-size: 13px;
      font-weight: 700;
      color: #64748b;
    }

    .dropdown {
      top: 45px;
      right: 0;
      width: 170px;
    }
  }

  .nav-actions {
    display: flex;
    gap: 12px;
  }

  .nav-btn {
    border: none;
    cursor: pointer;
    padding: 12px 18px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .history {
    background: #eff6ff;
    color: #2563eb;
    border: 1px solid #bfdbfe;
  }

  .history:hover {
    background: #dbeafe;
  }

  .dashboard {
    background: #0f172a;
    color: white;
  }

  .dashboard:hover {
    background: #1e293b;
  }

  @media (max-width: 768px) {
    .nav-actions {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .nav-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
