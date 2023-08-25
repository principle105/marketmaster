import type { GameData } from "./stores/game";

export const calculatePortfolioValue = (g: GameData) => {
    let value = 0;

    for (let investment of g.allInvestments) {
        if (!(investment.name in g.investments)) continue;

        value +=
            g.investments[investment.name] *
            investment.priceHistory[investment.priceHistory.length - 1];
    }

    return value;
};

export const listsOverLap = (a: any[], b: any[]) => {
    for (let item of a) {
        if (b.includes(item)) return true;
    }

    return false;
};

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getMonthList = (months: number) => {
    const monthList = [];

    for (let i = 1; i <= months; i++) {
        monthList.push(i);
    }

    return monthList;
};
