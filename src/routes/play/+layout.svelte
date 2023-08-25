<script lang="ts">
    import { onMount, type ComponentType, onDestroy } from "svelte";
    import type { Unsubscriber } from "svelte/motion";
    import { page } from "$app/stores";
    import game, { type GameData } from "$lib/stores/game";
    import {
        calculatePortfolioValue,
        listsOverLap,
        randomInt,
    } from "$lib/utils";

    import FaHome from "svelte-icons/fa/FaHome.svelte";
    import FaBook from "svelte-icons/fa/FaBook.svelte";
    import FaDollarSign from "svelte-icons/fa/FaDollarSign.svelte";
    import FaPlus from "svelte-icons/fa/FaPlus.svelte";
    import FaMoneyBill from "svelte-icons/fa/FaMoneyBill.svelte";
    import { events, type EventData, randomNews } from "$lib/data/events";
    import EventModal from "./EventModal.svelte";
    import EndScreen from "./EndScreen.svelte";
    import tutorialStage from "$lib/stores/tutorialStage";

    let pageURL = "";
    let pageUnsubscribe: Unsubscriber;

    onMount(() => {
        pageUnsubscribe = page.subscribe((p) => {
            pageURL = p.url.pathname;
        });
    });

    onDestroy(() => {
        if (pageUnsubscribe) {
            pageUnsubscribe();
        }
    });

    interface Page {
        name: string;
        icon: ComponentType;
        route: string;
    }

    const pages: Page[] = [
        {
            name: "Dashboard",
            icon: FaHome,
            route: "/play",
        },
        {
            name: "Portfolio",
            icon: FaDollarSign,
            route: "/play/portfolio",
        },
        {
            name: "Definitions",
            icon: FaBook,
            route: "/play/definitions",
        },
    ];

    let eventModal: EventData | null = null;

    const nextMonth = () => {
        tutorialStage.update((t) => {
            if (t === 6) {
                t = 7;
            } else if (t === 7) {
                t = 8;
            }
            return t;
        });

        game.update((g) => {
            g.month += 1;

            // If the game is finished
            if (g.month >= 12 * 5) {
                g.finished = true;
                return g;
            }

            // Update the price of each stock and add to price history
            g.allInvestments = g.allInvestments.map((investment) => {
                const price =
                    investment.priceHistory[investment.priceHistory.length - 1];

                // Vary the price by +2.2% to -2% of the current price (0.2% per month on average to simulate economic growth)
                let newPrice = Math.round(
                    price * (1 + Math.random() * 0.042 - 0.02)
                );

                investment.priceHistory.push(newPrice);

                // Updating the owning period
                if (investment.owningPeriod.length < g.month) {
                    investment.owningPeriod.push(
                        investment.owningPeriod[
                            investment.owningPeriod.length - 1
                        ]
                    );
                }

                return investment;
            });

            if (g.activeEvent === null) {
                // Random chance of an event happening
                if (g.month !== 2 && Math.random() < 0.333) {
                    const possibleEvents = events.filter(
                        (event) => !g.finishedEvents.includes(event.name)
                    );

                    const event =
                        possibleEvents[
                            Math.floor(Math.random() * possibleEvents.length)
                        ];

                    g.activeEvent = {
                        event,
                        stage: 0,
                        duration: randomInt(...event.duration),
                    };

                    g.activeEvent.event.newsHints[g.activeEvent.stage];
                }
            } else {
                const duration =
                    g.activeEvent.event.newsHints.length +
                    g.activeEvent.duration;

                if (g.activeEvent.stage === duration) {
                    g.finishedEvents.push(g.activeEvent.event.name);
                    g.activeEvent = null;
                }
            }

            if (g.activeEvent === null) {
                if (g.month !== 2 && Math.random() < 0.333) {
                    // Remove all the news stories that have already happened
                    const possibleNews = randomNews.filter(
                        (news) => !g.news.includes(news)
                    );

                    if (possibleNews.length === 0) {
                        return g;
                    }

                    // Picking a random news story
                    const story =
                        possibleNews[
                            Math.floor(Math.random() * possibleNews.length)
                        ];
                    g.news.push(story);
                }

                return g;
            }

            // Showing the event modal if the stage is right after the news
            if (g.activeEvent.stage === g.activeEvent.event.newsHints.length) {
                eventModal = g.activeEvent.event;
            }

            // Progressing the event

            // If the event is the news stage
            if (
                g.activeEvent.stage <=
                g.activeEvent.event.newsHints.length - 1
            ) {
                // Pushing the news to the news feed
                g.news.push(g.activeEvent.event.newsHints[g.activeEvent.stage]);
            } else {
                const event = g.activeEvent?.event as EventData;

                g.allInvestments = g.allInvestments.map((investment) => {
                    let modifier: [number, number] | null = null;

                    // Checking for increase
                    if (
                        event.increases &&
                        (listsOverLap(investment.tags, event.increases.tags) ||
                            investment.category in event.increases.categories)
                    ) {
                        modifier = [...event.increases.modifier];
                    } else if (
                        // Checking for decreases
                        event.decreases &&
                        (listsOverLap(investment.tags, event.decreases.tags) ||
                            investment.category in event.decreases.categories)
                    ) {
                        modifier = [
                            -event.decreases.modifier[0],
                            -event.decreases.modifier[1],
                        ];
                    } else {
                        return investment;
                    }

                    const price =
                        investment.priceHistory[
                            investment.priceHistory.length - 1
                        ];

                    // Vary the price by the modifiers
                    const newPrice = Math.round(
                        price *
                            (1 +
                                Math.random() * (modifier[1] - modifier[0]) +
                                modifier[0])
                    );

                    investment.priceHistory[
                        investment.priceHistory.length - 1
                    ] = newPrice;

                    return investment;
                });
            }

            // Pushing the news to the news feed

            g.activeEvent.stage += 1;

            return g;
        });
    };

    const updatePortfolioValue = (g: GameData) => {
        const value = calculatePortfolioValue(g);

        const netWorth = value + g.money;

        if (
            netWorth !== g.netWorthHistory[g.netWorthHistory.length - 1] ||
            g.netWorthHistory.length !== g.month
        ) {
            game.update((g) => {
                g.netWorthHistory.push(netWorth);
                return g;
            });
        }

        return value;
    };

    $: portfolioValue = updatePortfolioValue($game);
</script>

<EndScreen />

{#if !$game.loading}
    <div
        class="modal"
        class:modal-open={$tutorialStage === 0 && pageURL !== "/play/portfolio"}
    >
        <div class="modal-box">
            <h3 class="font-bold text-3xl">Welcome to Market Master</h3>
            <p class="py-4">
                The goal of this game is to earn as much money as possible from
                your starting $10,000 by investing it. Before you start playing,
                you must first create a portfolio. This is where you will be
                able to buy and sell assets.
            </p>

            <div class="modal-action">
                <a class="btn btn-primary" href="/play/portfolio">
                    Create Portfolio
                </a>
            </div>
        </div>
    </div>

    <main class="max-w-screen-lg mx-auto min-h-screen flex flex-col relative">
        {#if $tutorialStage === 6}
            <div class="absolute top-20 right-10 z-50">
                <div
                    class="tooltip tooltip-open tooltip-bottom tooltip-primary"
                    data-tip="Click to advance to the next month"
                />
            </div>
        {/if}
        <div class="stats shadow my-7">
            <div class="stat">
                <div class="stat-title">Net Worth</div>
                <div class="stat-value">
                    ${portfolioValue + $game.money}
                </div>

                <div class="stat-figure">
                    <div
                        class="tooltip tooltip-bottom"
                        data-tip="Total value of your portfolio and cash"
                    >
                        <div class="h-8 w-8 opacity-60">
                            <FaDollarSign />
                        </div>
                    </div>
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">Portfolio Value</div>
                <div class="stat-value">${portfolioValue}</div>
                <div class="stat-figure">
                    <div
                        class="tooltip tooltip-bottom"
                        data-tip="Total value of your portfolio"
                    >
                        <div class="h-8 w-8 opacity-60">
                            <FaBook />
                        </div>
                    </div>
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">Residual Cash</div>
                <div class="stat-value">${$game.money}</div>
                <div class="stat-figure">
                    <div
                        class="tooltip tooltip-bottom"
                        data-tip="Amount of cash you have left to invest"
                    >
                        <div class="h-8 w-8 opacity-60">
                            <FaMoneyBill />
                        </div>
                    </div>
                </div>
            </div>

            <div class="stat">
                <div class="stat-title">Month</div>
                <div class="stat-value">
                    {$game.month} <span class="text-xl">/ 60</span>
                </div>

                <div class="stat-figure">
                    <button class="btn btn-primary btn-xs" on:click={nextMonth}>
                        <div class="h-3 w-3">
                            <FaPlus />
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <div class="grow relative">
            <div class="absolute inset-0 h-full w-full">
                <slot />
            </div>
        </div>

        <div class="w-full h-[4rem] flex items-stretch my-4">
            {#each pages as page}
                {@const onPage = pageURL === page.route}
                {@const showDashboardTooltip =
                    page.name === "Dashboard" && $tutorialStage === 4}
                <a
                    href={page.route}
                    class="text-center flex flex-col items-center justify-center btn-ghost rounded-md !bg-opacity-5 w-full {onPage &&
                        'btn-active'}"
                    on:click={() => {
                        if (showDashboardTooltip) {
                            tutorialStage.set(5);
                        }
                    }}
                >
                    <div
                        class={showDashboardTooltip
                            ? "tooltip tooltip-open tooltip-primary"
                            : ""}
                        data-tip="Click to go to the dashboard"
                    >
                        <div
                            class="h-[1.1rem] w-[1.1rem] opacity-90 mx-auto mb-0.5"
                        >
                            <svelte:component this={page.icon} />
                        </div>
                        <span class="btm-nav-label">{page.name}</span>
                    </div>
                </a>
            {/each}
        </div>
    </main>

    <EventModal event={eventModal} />
{/if}
