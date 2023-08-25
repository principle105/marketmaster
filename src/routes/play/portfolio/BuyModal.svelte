<script lang="ts">
    import { onMount } from "svelte";
    import toast from "svelte-french-toast";
    import OutClick from "svelte-outclick";

    import type { InvestmentData } from "$lib/data/investments";
    import game from "$lib/stores/game";
    import tutorialStage from "$lib/stores/tutorialStage";

    export let investment: InvestmentData | null;

    let shares: number = 0;
    let shownInvestment: InvestmentData;

    onMount(() => (shares = 1));

    $: investment, resetStuff();
    $: shares, updateTutorialStage();

    const resetStuff = () => {
        if (investment === null) {
            shares = 1;
        } else {
            shownInvestment = investment;
        }
    };

    const updateTutorialStage = () => {
        if ($tutorialStage <= 2 && shares > 1) {
            tutorialStage.set(3);
        }
    };

    const buyShares = () => {
        if (investment === null) return;

        // Adding the share to the user
        game.update((g) => {
            g.money -=
                shares *
                (investment as InvestmentData).priceHistory[
                    (investment as InvestmentData).priceHistory.length - 1
                ];

            const name = (investment as InvestmentData).name;

            if (name in g.investments) {
                g.investments[name] += shares;
            } else {
                g.investments[name] = shares;

                // Updating the last bought month
                g.allInvestments = g.allInvestments.map((i) => {
                    if (i.name === name) {
                        i.owningPeriod[g.month - 1] = true;
                    }

                    return i;
                });
            }

            return g;
        });

        if ($tutorialStage <= 2) {
            tutorialStage.set(3);
        }

        investment = null;

        toast.success(`Successfully bought ${shares} shares!`);
    };
</script>

{#if shownInvestment}
    {@const maxPurchaseAmount = Math.floor(
        $game.money /
            shownInvestment.priceHistory[
                shownInvestment.priceHistory.length - 1
            ]
    )}
    <div class="modal" class:modal-open={investment}>
        <OutClick
            on:outclick={() => {
                investment = null;
            }}
        >
            <div class="modal-box">
                <h3 class="font-bold text-3xl">
                    {shownInvestment.name} (Buying)
                </h3>
                <div class="mt-10 mb-4 float-right text-4xl">
                    {shares} Shares
                </div>

                <input
                    type="range"
                    min="1"
                    max={maxPurchaseAmount}
                    bind:value={shares}
                    class="range range-sm"
                    step="1"
                />

                {#if $tutorialStage <= 2}
                    <div class="flex justify-center">
                        <div
                            class="tooltip tooltip-open tooltip-bottom tooltip-primary"
                            data-tip="Drag to change the amount of shares"
                        />
                    </div>
                {/if}

                <h4 class="mt-4">Summary</h4>

                <div class="overflow-x-auto">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td class="font-bold">Amount</td>
                                <td>{shares}</td>
                            </tr>
                            <tr>
                                <td class="font-bold">Price Per Share</td>
                                <td>
                                    ${shownInvestment.priceHistory[
                                        shownInvestment.priceHistory.length - 1
                                    ]}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-bold">Total Price</td>
                                <td>
                                    ${shares *
                                        shownInvestment.priceHistory[
                                            shownInvestment.priceHistory
                                                .length - 1
                                        ]}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-bold"
                                    >Residual Cash After Purchase</td
                                >
                                <td>
                                    ${$game.money -
                                        shares *
                                            shownInvestment.priceHistory[
                                                shownInvestment.priceHistory
                                                    .length - 1
                                            ]}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="modal-action">
                    <button
                        class="btn"
                        on:click={() => {
                            investment = null;
                        }}
                    >
                        Close
                    </button>

                    <button class="btn btn-primary" on:click={buyShares}>
                        Buy Shares
                    </button>
                </div>
            </div>
        </OutClick>
    </div>
{/if}
