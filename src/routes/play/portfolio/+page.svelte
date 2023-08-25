<script lang="ts">
    import toast from "svelte-french-toast";
    import type { InvestmentData } from "$lib/data/investments";
    import game, { type GameData } from "$lib/stores/game";

    import FaPlus from "svelte-icons/fa/FaPlus.svelte";

    import SellModal from "./SellModal.svelte";
    import BuyModal from "./BuyModal.svelte";
    import NewInvestmentModal from "./NewInvestmentModal.svelte";
    import { calculatePortfolioValue } from "$lib/utils";

    let sellInvestment: InvestmentData | null = null;
    let buyInvestment: InvestmentData | null = null;
    let isInvestmentModalOpen: boolean = false;

    const calculatePercentOfPortfolio = (
        investment: InvestmentData,
        shares: number,
        portfolioValue: number
    ) => {
        return Math.round(
            ((investment.priceHistory[investment.priceHistory.length - 1] *
                shares) /
                portfolioValue) *
                100
        );
    };

    const orderedInvestments = (g: GameData) => {
        const elligibleInvestments = g.allInvestments.filter(
            (i) => i.name in g.investments
        );

        // Order the investments by the percent of the portfolio and return the percent of the portfolio and investment
        return elligibleInvestments
            .map((i) => {
                return {
                    investment: i,
                    percentOfPortfolio: calculatePercentOfPortfolio(
                        i,
                        g.investments[i.name],
                        calculatePortfolioValue(g)
                    ),
                };
            })
            .sort((a, b) => b.percentOfPortfolio - a.percentOfPortfolio);
    };
</script>

<section>
    <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold">Portfolio</h1>
        <div
            class="hover:tooltip hover:tooltip-bottom"
            data-tip="Click to add a new investment"
        >
            <button
                class="btn btn-primary"
                on:click={() => {
                    isInvestmentModalOpen = true;
                }}
            >
                <div class="h-4 w-4">
                    <FaPlus />
                </div>
            </button>
        </div>
    </div>

    {#if Object.keys($game.investments).length === 0}
        <p class="opacity-60 mt-2">You don't have any investments yet</p>
    {:else}
        <div class="overflow-x-auto overflow-y-scroll max-h-[28rem]">
            <table class="table">
                <thead>
                    <tr>
                        <th class="pl-16">Name</th>
                        <th>% of Portfolio</th>
                        <th>Value</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {#each orderedInvestments($game) as { investment, percentOfPortfolio }}
                        {@const priceIncrease =
                            investment.priceHistory.length > 1
                                ? investment.priceHistory.slice(-1)[0] -
                                  investment.priceHistory.slice(-2)[0]
                                : 0}
                        <tr>
                            <td
                                class="border-l-[5.5px] {priceIncrease > 0
                                    ? 'border-success'
                                    : priceIncrease === 0
                                    ? 'border-neutral-content'
                                    : 'border-error'}"
                            >
                                <div class="flex items-center gap-4">
                                    <div>
                                        <img
                                            src={investment.logo}
                                            alt="{investment.name} Logo"
                                            class="w-8 h-8 object-contain rounded-none"
                                        />
                                    </div>

                                    <div>
                                        <div class="flex gap-1.5 items-center">
                                            <div class="font-bold">
                                                {investment.name}
                                            </div>
                                            <span
                                                class="badge badge-secondary badge-sm"
                                            >
                                                x{$game.investments[
                                                    investment.name
                                                ]} owned
                                            </span>
                                        </div>
                                        <span
                                            class="badge badge-ghost badge-sm"
                                        >
                                            {investment.category}
                                        </span>
                                        {#if investment.priceHistory.length > 1}
                                            <span
                                                class="badge badge-sm {priceIncrease >
                                                0
                                                    ? 'badge-success'
                                                    : priceIncrease === 0
                                                    ? 'badge-ghost'
                                                    : 'badge-error'}"
                                            >
                                                {priceIncrease > 0
                                                    ? "+"
                                                    : priceIncrease === 0
                                                    ? ""
                                                    : "-"}{Math.abs(
                                                    priceIncrease
                                                )}%
                                            </span>
                                        {/if}
                                    </div>
                                </div>
                            </td>
                            <td class="text-lg font-semibold">
                                {percentOfPortfolio}%
                            </td>
                            <td>
                                <div class="text-lg font-semibold">
                                    ${investment.priceHistory[
                                        investment.priceHistory.length - 1
                                    ] * $game.investments[investment.name]}
                                </div>
                                <div class="text-xs opacity-60">
                                    ${investment.priceHistory[
                                        investment.priceHistory.length - 1
                                    ]}/share
                                </div>
                            </td>
                            <th>
                                <button
                                    class="btn btn-ghost btn-sm"
                                    on:click={() => {
                                        sellInvestment = investment;
                                    }}
                                >
                                    Sell
                                </button>
                                <button
                                    class="btn btn-ghost btn-sm"
                                    on:click={() => {
                                        if (
                                            $game.money <
                                            investment.priceHistory.slice(-1)[0]
                                        ) {
                                            toast.error(
                                                "You don't have enough money to buy a share of this investment"
                                            );
                                            return;
                                        }

                                        buyInvestment = investment;
                                    }}
                                >
                                    Buy
                                </button>
                            </th>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</section>

<SellModal bind:investment={sellInvestment} />
<BuyModal bind:investment={buyInvestment} />
<NewInvestmentModal bind:isInvestmentModalOpen bind:buyInvestment />
