<script lang="ts">
    import { onMount } from "svelte";
    import toast from "svelte-french-toast";
    import OutClick from "svelte-outclick";

    import type { InvestmentData } from "$lib/data/investments";
    import game from "$lib/stores/game";

    export let investment: InvestmentData | null;

    let shares: number = 0;
    let shownInvestment: InvestmentData;

    onMount(() => (shares = 1));

    $: investment, resetStuff();

    const resetStuff = () => {
        if (investment === null) {
            shares = 1;
        } else {
            shownInvestment = investment;
        }
    };

    const sellShares = () => {
        if (investment === null) return;

        // Removing the shares from the user
        game.update((g) => {
            g.money +=
                shares *
                (investment as InvestmentData).priceHistory[
                    (investment as InvestmentData).priceHistory.length - 1
                ];

            const name = (investment as InvestmentData).name;

            g.investments[name] -= shares;

            if (g.investments[name] === 0) {
                delete g.investments[name];

                g.allInvestments = g.allInvestments.map((i) => {
                    if (i.name === name) {
                        i.owningPeriod[g.month - 1] = false;
                    }

                    return i;
                });
            }

            return g;
        });

        investment = null;

        toast.success(`Successfully sold ${shares} shares!`);
    };
</script>

{#if shownInvestment}
    <div class="modal" class:modal-open={investment}>
        <OutClick
            on:outclick={() => {
                if (investment) {
                    investment = null;
                }
            }}
        >
            <div class="modal-box">
                <h3 class="font-bold text-3xl">
                    {shownInvestment.name} (Selling)
                </h3>
                <div class="mt-10 mb-4 float-right text-4xl">
                    {shares} Shares
                </div>
                <input
                    type="range"
                    min="1"
                    max={$game.investments[shownInvestment.name]}
                    bind:value={shares}
                    class="range range-sm"
                    step="1"
                />

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
                                    >Residual Cash After Selling</td
                                >
                                <td>
                                    ${$game.money +
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
                    <button class="btn btn-primary" on:click={sellShares}>
                        Sell Shares
                    </button>
                </div>
            </div>
        </OutClick>
    </div>
{/if}
