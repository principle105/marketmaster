<script lang="ts">
    import { browser } from "$app/environment";
    import game, { defaultValue } from "$lib/stores/game";
    import toast from "svelte-french-toast";

    export let isScoreModalOpen: boolean;
    export let savedSuccessfuly: boolean;

    let name: string;

    const saveScore = async () => {
        isScoreModalOpen = false;

        const resp = await fetch("/api/save-score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                game: $game,
            }),
        });

        if (!resp.ok) {
            return false;
        }

        if (browser) {
            localStorage.removeItem("gameData");
        }

        game.set({
            ...JSON.parse(JSON.stringify(defaultValue)),
            finished: true,
        });

        savedSuccessfuly = true;

        return true;
    };
</script>

<div class="modal" class:modal-open={isScoreModalOpen}>
    <div class="modal-box">
        <h3 class="font-bold text-4xl">Save to Leaderboard</h3>

        <p class="mt-4 mb-5 text-lg">
            Input the name that you want to be displayed on the leaderboard.
        </p>

        <input
            type="text"
            placeholder="Your Name"
            class="input input-bordered w-full"
            bind:value={name}
        />

        <div class="modal-action">
            <button
                class="btn"
                on:click={() => {
                    isScoreModalOpen = false;
                }}
            >
                Close
            </button>
            <button
                class="btn btn-primary"
                on:click={() => {
                    toast.promise(saveScore(), {
                        loading: "Saving...",
                        success: "Score saved!",
                        error: "Score could not be saved.",
                    });
                }}
            >
                Save
            </button>
        </div>
    </div>
</div>
