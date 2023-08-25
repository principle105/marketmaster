<script lang="ts">
    import game from "$lib/stores/game";
    import OutClick from "svelte-outclick";

    import {
        type InvestmentData,
        investmentCategories,
        type InvestmentCategory,
    } from "$lib/data/investments";
    import NewInvestmentTable from "./NewInvestmentTable.svelte";
    import AboutModal from "./AboutModal.svelte";
    import tutorialStage from "$lib/stores/tutorialStage";

    export let isInvestmentModalOpen: boolean = false;
    export let buyInvestment: InvestmentData | null;

    let aboutInvestment: InvestmentData | null = null;
    let show: InvestmentCategory | null = null;

    const closeModal = () => {
        isInvestmentModalOpen = false;

        if ($tutorialStage === 3 && !buyInvestment) {
            tutorialStage.set(4);
        }
    };

    const showCollapse = (category: InvestmentCategory) => {
        category === show ? (show = null) : (show = category);
    };
</script>

<div
    class="modal"
    class:modal-open={($tutorialStage <= 3 || isInvestmentModalOpen) &&
        !buyInvestment}
>
    <OutClick
        on:outclick={() => {
            if ($tutorialStage >= 3 && !buyInvestment && !aboutInvestment) {
                closeModal();
            }
        }}
    >
        <div class="modal-box max-w-3xl">
            <h3 class="font-bold text-3xl">New Investment</h3>

            <p class="py-4 text-lg">Residual Cash: ${$game.money}</p>

            <div class="join join-vertical w-full relative">
                <div class="absolute left-1/2">
                    <div
                        class={$tutorialStage === 0
                            ? "tooltip tooltip-open tooltip-primary"
                            : ""}
                        data-tip="Select an investment category"
                    />
                </div>
                {#each investmentCategories as category}
                    <div
                        class="collapse collapse-arrow join-item border border-base-300"
                    >
                        <input
                            type="radio"
                            name="my-accordion-4"
                            checked={show !== null && show === category}
                            on:click={() => {
                                showCollapse(category);

                                if ($tutorialStage === 0) {
                                    tutorialStage.set(1);
                                }
                            }}
                        />
                        <div class="collapse-title text-lg font-medium">
                            {category}
                        </div>
                        <div class="collapse-content">
                            <div class="overflow-x-auto">
                                <NewInvestmentTable
                                    {category}
                                    bind:buyInvestment
                                    bind:aboutInvestment
                                />
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            {#if $tutorialStage >= 3}
                <div class="modal-action">
                    <button class="btn" on:click={closeModal}> Close </button>
                </div>
            {/if}
        </div>
    </OutClick>
</div>

<AboutModal bind:investment={aboutInvestment} />
