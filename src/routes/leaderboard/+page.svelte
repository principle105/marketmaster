<script lang="ts">
    import type { GameData } from "$lib/stores/game";
    import { onMount } from "svelte";
    import toast from "svelte-french-toast";
    import LeaderboardChartModal from "./LeaderboardChartModal.svelte";

    interface TimePeriods {
        name: string;
        value: number | null;
    }

    interface LeaderboardData {
        name: string;
        game: GameData;
        time: string;
    }

    let timePeriods: TimePeriods[] = [
        { name: "7 Days", value: 7 },
        { name: "30 Days", value: 30 },
        { name: "All-Time", value: null },
    ];

    let timePeriod = timePeriods[0].name;
    let lbData: LeaderboardData[] | null = null;

    let modalGame: GameData | null = null;
    let modalName: string | null = null;

    const fetchLeaderboard = async () => {
        let res: Response | null = null;

        lbData = null;
        const oldLbData = JSON.parse(JSON.stringify(lbData));

        if (timePeriods[0].value === null) {
            res = await fetch("/api/fetch-lb");
        } else {
            res = await fetch(
                `/api/fetch-lb?timeFrame=${timePeriods[0].value}`
            );
        }

        if (res === null || !res.ok) {
            lbData = oldLbData;
            toast.error("Failed to fetch leaderboard data.");
            return false;
        }

        const data = await res.json();

        lbData = data;

        return true;
    };

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const getRelativeTime = (time: string) => {
        const timeDifference =
            new Date(time).getTime() / 1000 - Date.now() / 1000;

        const minutes = Math.floor(timeDifference / 60);

        if (-minutes < 60) {
            return rtf.format(minutes, "minutes");
        }

        const hours = Math.floor(minutes / 60);

        if (-hours < 24) {
            return rtf.format(hours, "hours");
        }

        const days = Math.floor(hours / 24);

        return rtf.format(days, "days");
    };

    onMount(fetchLeaderboard);
</script>

<main class="flex flex-col pt-44 pb-16">
    <div class="max-w-screen-lg mx-auto">
        <h2 class="text-6xl font-bold text-center mb-10">Leaderboard</h2>
        <div class="mb-6 flex justify-center gap-2">
            {#each timePeriods as period}
                <button
                    class="btn btn-sm {timePeriod === period.name
                        ? 'btn-neutral'
                        : 'btn-outline'}"
                    on:click={async () => {
                        timePeriod = period.name;
                        await fetchLeaderboard();
                    }}
                >
                    {period.name}
                </button>
            {/each}
        </div>
        {#if lbData === null}
            <div class="flex justify-center mt-10">
                <span class="loading loading-spinner loading-lg" />
            </div>
        {:else if lbData.length === 0}
            <p class="text-center opacity-70 mt-10">No leaderboard data yet!</p>
        {:else}
            <table class="table table-lg">
                <thead>
                    <tr>
                        <th />
                        <th>Name</th>
                        <th>Net Worth</th>
                        <th>Time</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {#each lbData as data, i}
                        <tr>
                            <th>{i + 1}.</th>
                            <td>{data.name}</td>
                            <td>${data.game.netWorthHistory.slice(-1)[0]}</td>
                            <td>{getRelativeTime(data.time)}</td>
                            <th>
                                <button
                                    class="btn btn-ghost btn-sm"
                                    on:click={() => {
                                        modalGame = data.game;
                                        modalName = data.name;
                                    }}
                                >
                                    View Graphs
                                </button>
                            </th>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</main>

<LeaderboardChartModal bind:game={modalGame} bind:name={modalName} />
