<script lang="ts">
    let {
        label,
        title,
        subtitle,
        children
    } = $props<{
        label: string;
        title: string;
        subtitle: string;
        children?: any;
    }>();
</script>

<div class="header">
    <div>
        <p class="page-label">{label}</p>
        <h1 class="page-title">{title} </h1>
        <p class="page-subtitle">{subtitle}</p>
    </div>
{#if children}
    {@render children()}
{/if}
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        background: rgba(255, 255, 255, 0.92);
        padding: 28px;
        border-radius: 28px;
        border: 1px solid #e2e8f0;
        margin-bottom: 24px;
        box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
    }

    .page-label {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 2px;
        color: #2563eb;
        margin-bottom: 8px;
    }

    .page-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: #0f172a;
        line-height: 1.1;
    }

    .page-subtitle {
        margin-top: 8px;
        color: #64748b;
        line-height: 1.6;
    }

    @media (max-width: 768px) {
        .header {
            flex-direction: column;
            align-items: flex-start;
            padding: 22px;
            border-radius: 24px;
        }

        .page-title {
            font-size: 2rem;
        }

        .page-subtitle {
            font-size: 14px;
        }

        .header :global(button) {
            width: 100%;
        }
    }
</style>
