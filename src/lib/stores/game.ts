import { browser } from "$app/environment";
import { writable } from "svelte/store";
import investments from "$lib/data/investments";
import type { InvestmentData } from "$lib/data/investments";
import type { EventData } from "$lib/data/events";

export interface GameData {
    finished: boolean;
    money: number;
    netWorthHistory: number[];
    investments: { [k: string]: number };
    allInvestments: InvestmentData[];
    month: number;
    activeEvent: {
        event: EventData;
        stage: number;
        duration: number;
    } | null;
    finishedEvents: string[];
    news: string[];
    loading: boolean;
}

export const defaultValue: GameData = {
    finished: false,
    money: 10000,
    netWorthHistory: [10000],
    investments: {},
    allInvestments: investments,
    month: 1,
    activeEvent: null,
    finishedEvents: [],
    news: [],
    loading: false,
};

const loadingState = {
    ...defaultValue,
    loading: true,
};

const getInitialValue = () => {
    if (browser) {
        const storedValue = window.localStorage.getItem("gameData");

        if (storedValue) {
            return JSON.parse(storedValue) as GameData;
        } else {
            return JSON.parse(JSON.stringify(defaultValue));
        }
    }

    return loadingState;
};

const initialValue = getInitialValue();

const game = writable<GameData>(initialValue);

game.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem("gameData", JSON.stringify(value));
    }
});

export default game;
