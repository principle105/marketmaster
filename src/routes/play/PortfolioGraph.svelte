<script lang="ts">
    import type { GameData } from "$lib/stores/game";
    import { Line } from "svelte-chartjs";

    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    } from "chart.js";
    import { getMonthList } from "$lib/utils";

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale
    );

    let datasets: any[] = [];

    const nullifyPriceHistory = (owningPeriod: boolean[], list: number[]) => {
        return list.map((item, index) => {
            if (owningPeriod[index]) {
                return item;
            }

            return null;
        });
    };

    const getDataSet = (g: GameData) => {
        datasets = [];

        for (let investment of g.allInvestments) {
            if (!investment.owningPeriod.includes(true)) continue;

            const priceHistoryDisplay = nullifyPriceHistory(
                investment.owningPeriod,
                investment.priceHistory
            );

            datasets.push({
                label: investment.name,
                backgroundColor: investment.colour,
                borderColor: investment.colour,
                borderCapStyle: "butt",
                pointHoverRadius: 6,
                pointRadius: 4,
                data: priceHistoryDisplay,
            });
        }

        return datasets;
    };

    const intCallback = (value: number | string) => {
        if ((value as number) % 1 === 0) {
            return value;
        }
    };

    export let game: GameData;
</script>

<div class="h-full w-full portfolio-graph">
    <Line
        data={{
            labels: getMonthList(game.month),
            datasets: getDataSet(game),
        }}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Price/Share",
                    },
                    ticks: {
                        callback: intCallback,
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "Month",
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: "Portfolio Investment Prices",
                    font: {
                        size: 18,
                    },
                },
            },
        }}
    />
</div>

<style>
    :global([data-theme="dracula"] .portfolio-graph) {
        filter: invert(1) hue-rotate(60deg) saturate(125%) brightness(1.15);
    }
</style>
