<script lang="ts">
    import { Flag, Minus, ChevronDown } from "lucide-svelte";
    type Priority = "High" | "Medium" | "Low";
    let {
        priority = "Medium",
        showText = true
    }: {
        priority?: Priority;
        showText?: boolean;
    } = $props();
</script>

<div
    class="priority-badge"
    class:high={priority === "High"}
    class:medium={priority === "Medium"}
    class:low={priority === "Low"}
>
    {#if priority === "High"}
        <Flag size={14} />
    {:else if priority === "Medium"}
        <Minus size={14} />
    {:else}
        <ChevronDown size={14} />
    {/if}

    {#if showText}
        <span>{priority}</span>
    {/if}
</div>

<style>
    .priority-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #334155;
    }

    .high {
        color: #ef4444;
    }

    .medium {
        color: #f59e0b;
    }

    .low {
        color: #3154ff;
    }

    span {
        font-weight: 600;
    }
</style>