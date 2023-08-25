<script lang="ts">
    import game from "$lib/stores/game";
    import tutorialStage from "$lib/stores/tutorialStage";

    import NetWorthGraph from "./NetWorthGraph.svelte";
    import PortfolioGraph from "./PortfolioGraph.svelte";
</script>

<div class="h-full w-full grid grid-cols-12 gap-8">
    <div class="h-full grid grid-rows-5 col-span-8 invert-colours">
        <div class="row-span-2">
            <NetWorthGraph game={$game} />
        </div>
        <div class="h-full row-span-3">
            <PortfolioGraph game={$game} />
        </div>
    </div>

    <div class="h-full bg-neutral-focus opacity-90 rounded-md p-6 col-span-4">
        <h3 class="text-2xl mb-3 font-bold text-white">News Headlines</h3>
        <div
            class={$tutorialStage === 7
                ? "tooltip tooltip-open tooltip-bottom tooltip-primary"
                : ""}
            data-tip="Watch out for any news that might affect your portfolio!"
        >
            <div class="flex flex-col gap-5 opacity-80 text-white">
                {#if $game.news.length === 0}
                    <p>No news yet!</p>
                {:else}
                    {#each $game.news.slice(-5).reverse() as news, i}
                        <p>{i + 1}. {news}</p>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>

<div class="modal" class:modal-open={$tutorialStage === 5}>
    <div class="modal-box">
        <h3 class="font-bold text-3xl">How to Play</h3>
        <p class="my-4">
            Now that you've created your portfolio, you can start reacting to
            changes in the market and news to maximize your earnings. The market
            prices change every month. You can advance to the next month by
            clicking the + button on the top right.
        </p>
        <p class="my-4" />

        <div class="modal-action">
            <button
                class="btn btn-primary"
                on:click={() => {
                    tutorialStage.set(6);
                }}
            >
                Show Me
            </button>
        </div>
    </div>
</div>
