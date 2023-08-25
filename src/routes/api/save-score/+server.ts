import clientPromise from "$lib/mongodb";
import type { RequestHandler } from "@sveltejs/kit";
import type { GameData } from "$lib/stores/game";

interface Params {
    name: string | undefined;
    game: GameData | undefined;
}

export const POST: RequestHandler = async ({ request }) => {
    const { name, game }: Params = await request.json();

    if (name === undefined || game === undefined) {
        return new Response(
            JSON.stringify({
                status: 400,
                body: "Missing name or game data.",
            })
        );
    }

    const lbCollection = (await clientPromise).db().collection("leaderboard");

    await lbCollection.insertOne({
        name,
        game,
        time: new Date(),
    });

    return new Response(
        JSON.stringify({
            status: 200,
            body: "Saved to leaderboard!",
        })
    );
};
