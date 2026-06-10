<script lang="ts">
    import {ChevronLeft,ChevronRight} from "lucide-svelte";

    let {
        currentPage,
        totalPages,
        previous,
        next,
    }: {
        currentPage: number;
        totalPages: number;
        previous: () => void;
        next: () => void;
    } = $props();
</script>

<div class="pagination">
    <button
        class="page-btn"
        onclick={previous}
        disabled={currentPage === 1}
    >
        <ChevronLeft size={18} />
        Previous
    </button>

    <div class="page-indicator">
        {currentPage} / {totalPages}
    </div>

    <button
        class="page-btn"
        onclick={next}
        disabled={currentPage === totalPages}
    >
        Next
        <ChevronRight size={18} />
    </button>
</div>

<style>
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        margin-top: 28px;
    }

    .page-btn {
        border: 1px solid #e2e8f0;
        background: white;
        min-width: 120px;
        height: 44px;
        padding: 0 16px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        color: #334155;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.25s ease;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    }

    .page-btn:hover:not(:disabled) {
        transform: translateY(-2px);
    }

    .page-btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    .page-indicator {
        min-width: 70px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
        color: #2563eb;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    }

    @media (max-width: 768px) {
        .pagination {
            gap: 8px;
        }

        .page-btn {
            min-width: 110px;
            height: 42px;
            font-size: 13px;
        }

        .page-indicator {
            min-width: 60px;
            height: 42px;
            font-size: 13px;
        }
    }
</style>