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

    const intCallback = (value: number | string) => {
        if ((value as number) % 1 === 0) {
            return value;
        }
    };

    export let game: GameData;
</script>

<div class="h-full w-full net-worth-graph">
    <Line
        data={{
            labels: getMonthList(game.month),
            datasets: [
                {
                    backgroundColor: "#4818e5",
                    borderColor: "#4818e5",
                    borderCapStyle: "butt",
                    pointHoverRadius: 6,
                    pointRadius: 4,
                    data: game.netWorthHistory,
                },
            ],
        }}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Net Worth",
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
                    text: "Net Worth",
                    font: {
                        size: 18,
                    },
                },
                legend: {
                    display: false,
                },
            },
        }}
    />
</div>

<style>
    :global([data-theme="dracula"] .net-worth-graph) {
        filter: invert(1) hue-rotate(250deg) brightness(1.15);
    }
</style>
