<script lang="ts">
    import OutClick from "svelte-outclick";
    import type { InvestmentData } from "$lib/data/investments";
    import tutorialStage from "$lib/stores/tutorialStage";

    export let investment: InvestmentData | null;

    let shownInvestment: InvestmentData;

    $: investment, resetShownInvestment();

    const resetShownInvestment = () => {
        if (investment !== null) {
            shownInvestment = investment;
        }
    };

    const handleClose = () => {
        investment = null;

        if ($tutorialStage === 1) {
            tutorialStage.set(2);
        }
    };
</script>

{#if shownInvestment}
    <div class="modal" class:modal-open={investment}>
        <OutClick
            on:outclick={() => {
                if (investment) {
                    handleClose();
                }
            }}
        >
            <div class="modal-box">
                <div class="flex gap-2">
                    <img
                        src={shownInvestment.logo}
                        alt="{shownInvestment.name} Logo"
                        class="h-8 w-8 object-contain"
                    />
                    <h3 class="font-bold text-3xl">
                        {shownInvestment.name}
                    </h3>
                </div>
                <div class="mt-4">
                    {shownInvestment.description}
                </div>

                <div class="modal-action">
                    <button class="btn" on:click={handleClose}>Close</button>
                </div>
            </div>
        </OutClick>
    </div>
{/if}
