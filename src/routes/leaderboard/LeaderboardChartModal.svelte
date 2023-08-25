<script lang="ts">
    import OutClick from "svelte-outclick";
    import type { GameData } from "$lib/stores/game";
    import NetWorthGraph from "../play/NetWorthGraph.svelte";
    import PortfolioGraph from "../play/PortfolioGraph.svelte";

    export let game: GameData | null;
    export let name: string | null;

    let shownGame: GameData;

    $: game, resetShownInvestment();

    const resetShownInvestment = () => {
        if (game !== null) {
            shownGame = game;
        }
    };
</script>

{#if shownGame}
    <div class="modal" class:modal-open={game && name}>
        <OutClick
            on:outclick={() => {
                if (game) game = null;
            }}
        >
            <div class="modal-box max-w-3xl h-full">
                <h3 class="font-bold text-3xl mb-6">
                    {name}'s Graph (${shownGame.netWorthHistory.slice(-1)[0]})
                </h3>

                <div class="h-4/5">
                    <div class="h-full grid grid-rows-5 invert-colours">
                        <div class="row-span-2">
                            <NetWorthGraph game={shownGame} />
                        </div>
                        <div class="h-full row-span-3">
                            <PortfolioGraph game={shownGame} />
                        </div>
                    </div>
                </div>

                <div class="modal-action">
                    <button class="btn" on:click={() => (game = null)}>
                        Close
                    </button>
                </div>
            </div>
        </OutClick>
    </div>
{/if}
