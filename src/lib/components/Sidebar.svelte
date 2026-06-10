<script>
  import { goto } from "$app/navigation";
  import Button from "./Button.svelte";
</script>

<aside class="sidebar">
  <div class="sidebar-top">
    <h1>Task Manager</h1>

    <p class="subtitle">
      Organize, track and manage your daily tasks efficiently
    </p>
  </div>
  <div class="sidebar-divider"></div>

  <div class="sidebar-actions">
    <Button label="List View" variant="sidebar" onclick={() => goto("/list")} />
    <Button
      label="View History"
      variant="sidebar"
      onclick={() => goto("/history")}
    />
  </div>
</aside>

<style>
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

  .sidebar h1 {
    color: white;
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1.2;
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

  @media (max-width: 900px) {
    .sidebar h1 {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 768px) {
    .sidebar h1 {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 8px;
    }
  }

  @media (min-width: 769px) and (max-width: 1100px) {
    .sidebar h1 {
      font-size: 1.8rem;
    }
  }
</style>
