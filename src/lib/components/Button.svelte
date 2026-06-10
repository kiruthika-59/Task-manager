<script lang="ts">
    let {
        label,onclick,
        variant = "primary",
        disabled = false,
    } = $props<{
        label: string;
        onclick?: () => void;
        variant?:
            | "primary"
            | "toggle"
            | "edit"
            | "view"
            | "delete"
            | "back"
            | "save"
            | "cancel"
            | "sidebar";
        disabled?: boolean;
    }>();
</script>

<button class={`btn ${variant}`} {disabled} {onclick}>
    {label}
</button>

<style>
    .btn {
        border: none;
        cursor: pointer;
        color: white;
        padding: 12px 18px;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 600;
        transition: 0.2s ease;
    }

    .btn:hover {
        transform: translateY(-2px);
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .primary {
        background: #2563eb;
    }

    .toggle {
        background: #3b82f6;
    }

    .edit {
        background: #f59e0b;
    }

    .view {
        background: #10b981;
    }

    .delete {
        background: #ef4444;
    }

    .back {
        background: #334155;
    }

    .save {
        background: #10b981;
    }

    .cancel {
        background: #64748b;
    }

    .sidebar {
        background: #3b82f6;
        margin-bottom: 10px;
    }
</style>
