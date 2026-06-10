<script lang="ts">
    let {
        value = $bindable(),
        placeholder = "Search tasks..."
    } = $props();
</script>

<div class="search-wrapper">
    <input
        type="text"
        bind:value
        {placeholder}
    />
</div>

<style>
    * {
        box-sizing: border-box;
    }

    .search-wrapper {
        width: 100%;
        max-width: 100%;
        margin-bottom: 30px;
    }

    input {
        width: 100%;
        max-width: 100%;
        display: block;
        height: 58px;
        padding: 0 22px;
        border: 1px solid #dbeafe;
        border-radius: 20px;
        outline: none;
        background: rgba(255, 255, 255, 0.95);
        font-size: 15px;
        color: #0f172a;
        transition: all 0.3s ease;
        box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);
    }

    input::placeholder {
        color: #94a3b8;
    }

    input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.12);
    }

    @media (max-width: 768px) {
        .search-wrapper {
            margin-bottom: 20px;
        }

        input {
            height: 52px;
            padding: 0 16px;
            font-size: 14px;
            border-radius: 16px;
        }
    }

    @media (max-width: 480px) {
        input {
            height: 48px;
            padding: 0 14px;
            font-size: 13px;
            border-radius: 14px;
        }
    }
</style>