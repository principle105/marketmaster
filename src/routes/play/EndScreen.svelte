<script lang="ts">
    import { browser } from "$app/environment";
    import game, { defaultValue } from "$lib/stores/game";
    import SaveModal from "./SaveModal.svelte";

    let isScoreModalOpen = false;
    let savedSuccessfuly = false;

    const newGame = () => {
        if (browser) {
            localStorage.removeItem("gameData");
        }

        game.set(JSON.parse(JSON.stringify(defaultValue)));

        savedSuccessfuly = false;
        isScoreModalOpen = false;
    };

    const saveScore = () => {
        isScoreModalOpen = true;
    };
</script>

<div class="modal" class:modal-open={$game.finished}>
    {#if $game.finished}
        <div class="modal-box max-w-2xl">
            <h3 class="font-bold text-4xl">Game Over</h3>
            <div class="text-xl mt-4">
                <span class="font-bold">Net Worth:</span>
                <span>${$game.netWorthHistory.slice(-1)[0]}</span>
            </div>
            <div class="text-xl mt-4">
                Good job, you made it to the end of the game! You can now save
                your score to the leaderboard.
            </div>

            <div class="modal-action">
                {#if !savedSuccessfuly && $game.month !== 1}
                    <button class="btn btn-primary" on:click={newGame}>
                        Play Again
                    </button>
                    <button class="btn btn-secondary" on:click={saveScore}>
                        Save Score
                    </button>
                {:else}
                    <button class="btn btn-primary" on:click={newGame}>
                        Play Again
                    </button>
                {/if}
            </div>
        </div>
    {/if}
</div>

<SaveModal bind:isScoreModalOpen bind:savedSuccessfuly />
