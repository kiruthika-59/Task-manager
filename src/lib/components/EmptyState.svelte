<script lang="ts">
    let {
        title,description,
    }: {
        title: string;
        description: string;
    } = $props();
</script>

<div class="empty">
    <div class="empty-icon">📂</div>
    <h2 class="empty-title">{title} </h2>
    <p class="empty-description">{description}</p>
</div>

<style>
    .empty {
        background: white;
        padding: 70px 40px;
        border-radius: 28px;
        text-align: center;
        border: 2px dashed #dbeafe;
        box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
    }

    .empty-icon {
        font-size: 3rem;
        margin-bottom: 14px;
    }

    .empty-title {
        font-size: 1.7rem;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 10px;
    }

    .empty-description {
        color: #64748b;
        line-height: 1.7;
    }

    @media (max-width: 768px) {
        .empty {
            padding: 50px 24px;
        }

        .empty-title {
            font-size: 1.4rem;
        }
    }
</style>
