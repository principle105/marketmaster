<script lang="ts">
    import type { EventData } from "$lib/data/events";
    import FaExclamationTriangle from "svelte-icons/fa/FaExclamationTriangle.svelte";

    export let event: EventData | null;
</script>

<div class="modal" class:modal-open={event}>
    {#if event}
        <div class="modal-box">
            <div class="flex gap-2 items-center">
                <div class="h-7 w-7">
                    <FaExclamationTriangle />
                </div>
                <h3 class="font-bold text-2xl">
                    {event.name}
                </h3>
            </div>
            <p class="py-4">
                {event.description}
            </p>

            <div class="modal-action">
                <button class="btn" on:click={() => (event = null)}>
                    Close
                </button>
                <a
                    class="btn btn-primary"
                    href="/play/portfolio"
                    on:click={() => (event = null)}
                >
                    Adjust Portfolio
                </a>
            </div>
        </div>
    {/if}
</div>
