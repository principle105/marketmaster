<script lang="ts">
    import toast from "svelte-french-toast";
    import game from "$lib/stores/game";
    import type {
        InvestmentCategory,
        InvestmentData,
    } from "$lib/data/investments";
    import tutorialStage from "$lib/stores/tutorialStage";

    export let category: InvestmentCategory;
    export let buyInvestment: InvestmentData | null;
    export let aboutInvestment: InvestmentData | null = null;

    const handleBuyInvestment = (investment: InvestmentData) => {
        if ($game.money < investment.priceHistory.slice(-1)[0]) {
            toast.error(
                "You don't have enough money to buy a share of this investment"
            );
            return;
        }

        buyInvestment = investment;
    };

    $: elligibleInvestments = $game.allInvestments.filter(
        (i) => i.category === category
    );
</script>

<table class="table">
    <thead>
        <tr>
            <th class="pl-16">Name</th>
            <th>Price</th>
            <th />
        </tr>
    </thead>
    <tbody>
        {#each elligibleInvestments as investment, n}
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

                                {#if investment.name in $game.investments}
                                    <span
                                        class="badge badge-secondary badge-sm"
                                    >
                                        x{$game.investments[investment.name]} owned
                                    </span>
                                {/if}
                            </div>
                            <span class="badge badge-ghost badge-sm">
                                {investment.category}
                            </span>
                            {#if investment.priceHistory.length > 1}
                                <span
                                    class="badge badge-sm {priceIncrease > 0
                                        ? 'badge-success'
                                        : priceIncrease === 0
                                        ? 'badge-ghost'
                                        : 'badge-error'}"
                                >
                                    {priceIncrease > 0
                                        ? "+"
                                        : priceIncrease === 0
                                        ? ""
                                        : "-"}{Math.abs(priceIncrease)}%
                                </span>
                            {/if}
                        </div>
                    </div>
                </td>
                <td>
                    <div class="text-lg font-semibold">
                        ${investment.priceHistory[
                            investment.priceHistory.length - 1
                        ]}
                    </div>
                </td>
                <th>
                    {#if n === 0 && $tutorialStage === 1}
                        <div
                            class="tooltip tooltip-open tooltip-primary font-normal"
                            data-tip="Click to learn more about the investment"
                        >
                            <button
                                class="btn btn-ghost btn-sm"
                                on:click={() => (aboutInvestment = investment)}
                            >
                                About
                            </button>
                        </div>
                    {:else}
                        <button
                            class="btn btn-ghost btn-sm"
                            on:click={() => (aboutInvestment = investment)}
                        >
                            About
                        </button>
                    {/if}
                    {#if n === 0 && $tutorialStage === 2}
                        <div
                            class="tooltip tooltip-open tooltip-primary tooltip-left font-normal"
                            data-tip="Click to buy a share of the investment"
                        >
                            <button
                                class="btn btn-ghost btn-sm"
                                on:click={() => handleBuyInvestment(investment)}
                            >
                                Buy
                            </button>
                        </div>
                    {:else}
                        <button
                            class="btn btn-ghost btn-sm"
                            on:click={() => handleBuyInvestment(investment)}
                        >
                            Buy
                        </button>
                    {/if}
                </th>
            </tr>
        {/each}
    </tbody>
</table>
