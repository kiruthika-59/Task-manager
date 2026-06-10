<script lang="ts">
  import { taskStore } from "$lib/stores/taskStore";
  import {ClipboardList,CircleDashed,LoaderCircle,CircleCheckBig,  } from "lucide-svelte";

  const totalTasks = $derived($taskStore.length);

  const todoTasks = $derived(
    $taskStore.filter((task) => task.status === "To-Do").length,
  );

  const progressTasks = $derived(
    $taskStore.filter((task) => task.status === "In Progress").length,
  );

  const doneTasks = $derived(
    $taskStore.filter((task) => task.status === "Done").length,
  );

  const stats = $derived([
    {
      title: "Total Tasks",
      count: totalTasks,
      icon: ClipboardList,
      className: "total",
    },
    {
      title: "To-Do",
      count: todoTasks,
      icon: CircleDashed,
      className: "todo",
    },
    {
      title: "In Progress",
      count: progressTasks,
      icon: LoaderCircle,
      className: "progress",
    },
    {
      title: "Completed",
      count: doneTasks,
      icon: CircleCheckBig,
      className: "done",
    },
  ]);
</script>

<div class="stats-wrapper">
  {#each stats as stat}
    <div class={`stat-card ${stat.className}`}>
      <div class="icon-box">
        <stat.icon size={18} />
      </div>

      <div class="stat-content">
        <h3>{stat.count}</h3>
        <p>{stat.title}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .stats-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }

  .stat-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    transition: all 0.2s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  }
  .icon-box {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .stat-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .stat-content h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 700;
    color: #0f172a;
  }

  .stat-content p {
    margin: 2px 0 0;
    font-size: 12px;
    color: #64748b;
  }

  .total .icon-box {
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
  }

  .todo .icon-box {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
  }

  .progress .icon-box {
    background: rgba(139, 92, 246, 0.15);
    color: #a78bfa;
  }

  .done .icon-box {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
  }

  @media (max-width: 768px) {
    .stats-wrapper {
      gap: 8px;
    }

    .stat-card {
      min-height: 62px;
      padding: 8px;
    }

    .icon-box {
      width: 30px;
      height: 30px;
    }

    .stat-content h3 {
      font-size: 0.95rem;
    }

    .stat-content p {
      font-size: 10px;
    }
  }

  @media (max-width: 768px) {
    .stats-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .stat-card {
      min-height: auto;
      padding: 12px;
    }

    .icon-box {
      width: 36px;
      height: 36px;
    }

    .stat-content h3 {
      font-size: 1rem;
    }

    .stat-content p {
      font-size: 11px;
    }
  }
</style>
