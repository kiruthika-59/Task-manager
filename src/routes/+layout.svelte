<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { Toaster } from "svelte-sonner";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  let { children } = $props();

  const navItems = [
    { label: "Dashboard",path: "/",},
    { label: "List View",path: "/list",},
    { label: "History",path: "/history",},
  ];

  function isActive(path: string) {
    return page.url.pathname === path;
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-top">
      <h1>Task Manager</h1>

      <p class="subtitle">
        Organize, track and manage your daily tasks efficiently
      </p>
    </div>

    <div class="sidebar-divider"></div>

    <div class="sidebar-actions">
      {#each navItems as item}
        <button
          class:active={isActive(item.path)}
          onclick={() => goto(item.path)}
          disabled={isActive(item.path)}
        >
          {item.label}
        </button>
      {/each}
    </div>
  </aside>

  <main class="main-content">
    {@render children()}
  </main>
</div>

<Toaster position="bottom-center" richColors duration={2000} />

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

  .layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    min-height: 100vh;
  }

  .sidebar {
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
    color: white;
    padding: 24px 20px;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.12);
  }

  .sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .sidebar h1 {
    font-size: 2rem;
    font-weight: 800;
  }

  .subtitle {
    color: #cbd5e1;
    font-size: 14px;
    line-height: 1.7;
  }

  .sidebar-divider {
    height: 1px;
    margin: 22px 0;
    background: rgba(255, 255, 255, 0.08);
  }

  .sidebar-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sidebar-actions button {
    border: none;
    cursor: pointer;
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 600;
    transition: 0.25s ease;
    background: rgba(255, 255, 255, 0.08);
    color: white;
  }

  .sidebar-actions button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.16);
  }

  .sidebar-actions button.active {
    background: #2563eb;
    color: white;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.3);
    cursor: default;
  }

  .sidebar-actions button:disabled {
    opacity: 1;
  }

  .main-content {
    padding: 24px 32px;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    .layout {
      display: flex;
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
      border-radius: 0 0 24px 24px;
    }

    .sidebar-actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .main-content {
      padding: 16px;
    }
  }
</style>
