<script lang="ts">
    import { taskStore } from "$lib/stores/taskStore";
    import { filterTasks } from "$lib/utils/taskFilter";
    import SearchBar from "$lib/components/SearchBar.svelte";
    import Header from "$lib/components/Header.svelte";
    import EmptyState from "$lib/components/EmptyState.svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    import { ArrowUpRight } from "lucide-svelte";

    let search = $state("");
    const ITEMS_PER_PAGE = 5;
    let currentPage = $state(1);
    const filteredTasks = $derived(filterTasks($taskStore, search));

    const historyTasks = $derived(
        filteredTasks
            .filter((task) => task.closed)
            .sort(
                (a, b) =>
                    new Date(b.closedAt ?? 0).getTime() -
                    new Date(a.closedAt ?? 0).getTime(),
            ),
    );

    const totalPages = $derived(
        Math.ceil(historyTasks.length / ITEMS_PER_PAGE),
    );

    const paginatedHistory = $derived(
        historyTasks.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE,
        ),
    );

    $effect(() => {
        search;
        currentPage = 1;
    });
</script>

<div class="container">
    <Header
    label="TASK HISTORY"
    title="History"
    subtitle="View all completed and closed tasks"
/>
    <SearchBar bind:value={search} placeholder="Search history..." />

    {#if historyTasks.length === 0}
        <EmptyState
            title="No History Found"
            description="Closed tasks will appear here."
        />
    {:else}
        <div class="history-table">
            <div class="history-header">
                <span>Task</span>
                <span>Priority</span>
                <span>Status</span>
                <span>Closed Date</span>
            </div>

            {#each paginatedHistory as task}
                <div class="history-row">
                    <div class="history-task">
                        <a
                            href={`/task/${task.id}`}
                            data-sveltekit-preload-data="hover"
                            class="task-link"
                        >
                            <span>{task.title}</span>
                            <ArrowUpRight size={14} />
                        </a>
                    </div>

                    <div class="history-priority">
                        <span class={`priority-pill priority-${task.priority.toLowerCase()}`}>
                            {task.priority}
                        </span>
                    </div>

                    <div class="history-status">
                        <span class="closed-badge"> Closed </span>
                    </div>

                    <div class="history-date close-date">
                        {task.closedAt? new Date(task.closedAt).toLocaleDateString(): "—"}
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
        background: linear-gradient(
            135deg,
            #f8fafc 0%,
            #eef2ff 50%,
            #f8fafc 100%
        );
        min-height: 100vh;
    }

    .container {
        width: 92%;
        max-width: 1200px;
        margin: 32px auto;
    }

    .history-table {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 24px;
        overflow: hidden;
        border: 1px solid #e2e8f0;
        box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
    }

    .history-header,
    .history-row {
        display: grid;
        grid-template-columns: 2.5fr 1fr 1fr 1.2fr;
        align-items: center;
    }

    .history-header {
        background: #f8fafc;
        padding: 18px 24px;
        border-bottom: 1px solid #e2e8f0;
        font-size: 13px;
        font-weight: 700;
        color: #64748b;
    }

    .history-row {
        padding: 18px 24px;
        border-bottom: 1px solid #f1f5f9;
        transition: 0.2s ease;
    }

    .history-row:hover {
        background: rgba(59, 130, 246, 0.04);
    }

    .history-header span:first-child,
    .history-task {
        justify-self: start;
        text-align: left;
    }

    .history-header span:nth-child(2),
    .history-header span:nth-child(3),
    .history-header span:nth-child(4) {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .history-priority,
    .history-status,
    .history-date {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .close-date {
        font-size: 13px;
        font-weight: 500;
        color: #64748b;
    }

    .closed-badge {
        background: #dbeafe;
        color: #1d4ed8;
        padding: 8px 14px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 700;
    }

    .priority-pill {
        width: 90px;
        text-align: center;
        padding: 6px 0;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
    }

    .priority-high {
        background: #fee2e2;
        color: #dc2626;
    }

    .priority-medium {
        background: #fef3c7;
        color: #d97706;
    }

    .priority-low {
        background: #dcfce7;
        color: #16a34a;
    }

    .task-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        text-decoration: none;
        color: #0f172a;
        font-size: 1rem;
        font-weight: 700;
        transition: color 0.2s ease;
    }

    .task-link:hover {
        color: #2563eb;
    }

    @media (max-width: 768px) {
        .container {
            width: 94%;
            margin: 20px auto;
        }

        .history-header {
            display: none;
        }

        .history-table {
            background: transparent;
            border: none;
            box-shadow: none;
        }

        .history-row {
            display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
            background: white;
            border-radius: 24px;
            padding: 18px;
            margin-bottom: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
        }

        .history-row:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
        }

        .history-task {
            width: 100%;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 12px;
            margin-bottom: 4px;
        }

        .history-priority,
        .history-status,
        .history-date {
            width: 100%;
            justify-content: space-between;
        }

        .history-priority::before {
            content: "Priority";
            color: #64748b;
            font-size: 13px;
            font-weight: 600;
        }

        .history-status::before {
            content: "Status";
            color: #64748b;
            font-size: 13px;
            font-weight: 600;
        }

        .history-date::before {
            content: "Closed Date";
            color: #64748b;
            font-size: 13px;
            font-weight: 600;
        }

        .closed-badge {
            font-size: 12px;
            padding: 6px 12px;
        }

        .priority-pill {
            width: auto;
            min-width: 80px;
        }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        .container {
            width: 95%;
        }

        .history-table {
            overflow-x: auto;
        }

        .history-header,
        .history-row {
            min-width: 700px;
            grid-template-columns: 2.5fr 1fr 1fr 1.2fr;
        }
    }
</style>
