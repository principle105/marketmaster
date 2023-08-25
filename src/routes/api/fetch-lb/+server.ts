import clientPromise from "$lib/mongodb";
import type { RequestHandler } from "@sveltejs/kit";
import type { GameData } from "$lib/stores/game";
import type { FindCursor } from "mongodb";

interface Leaderboard {
    _id: string;
    name: string;
    game: GameData;
    time: Date;
}

export const GET: RequestHandler = async ({ url: { searchParams } }) => {
    const timeFrame = searchParams.get("timeFrame");

    let limit: number | null = null;

    if (timeFrame !== null) {
        limit = parseInt(timeFrame);
    }

    const lbCollection = (await clientPromise).db().collection("leaderboard");

    let lbCursor: FindCursor | null;

    if (limit === null) {
        lbCursor = await lbCollection.find();
    } else {
        lbCursor = await lbCollection.find({
            time: {
                $gte: new Date(Date.now() - limit * 60 * 60 * 24 * 1000),
            },
        });
    }

    if (lbCursor === null) {
        return new Response(
            JSON.stringify({
                status: 400,
                body: "No leaderboard found.",
            })
        );
    }

    const leaderboard = (await lbCursor.toArray()) as Leaderboard[];

    // Sorting the leaderboard by net worth
    leaderboard.sort((a, b) => {
        const aNetWorth =
            a.game.netWorthHistory[a.game.netWorthHistory.length - 1];
        const bNetWorth =
            b.game.netWorthHistory[b.game.netWorthHistory.length - 1];

        return bNetWorth - aNetWorth;
    });

    // Getting top 100
    leaderboard.splice(100);

    return new Response(JSON.stringify(leaderboard));
};
