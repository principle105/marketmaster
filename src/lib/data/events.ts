import type { InvestmentCategory, InvestmentTag } from "./investments";

export interface EventData {
    name: string;
    description: string;
    increases?: {
        tags: InvestmentTag[];
        categories: InvestmentCategory[];
        modifier: [number, number];
    };
    decreases?: {
        tags: InvestmentTag[];
        categories: InvestmentCategory[];
        modifier: [number, number];
    };
    newsHints: string[];
    duration: [number, number];
}

export const events: EventData[] = [
    {
        name: "Monetary Policy: Central Bank Prints More Money.",
        description: "Interest Rates Decreases by 2.5%.",
        increases: {
            tags: [],
            categories: ["Bond"],
            modifier: [0.13, 0.15],
        },
        newsHints: ["The Central Bank is looking to control inflation."],
        duration: [2, 2],
    },
    {
        name: "Monetary Policy: Central Bank Buys Treasury Bonds.",
        description: "Interest Rates Decreases by 3%.",
        increases: {
            tags: [],
            categories: ["Bond"],
            modifier: [0.14, 0.16],
        },
        newsHints: ["The Central Bank thinks inflation is a little high."],
        duration: [2, 2],
    },
    {
        name: "Monetary Policy: Central Bank Sells Treasury Bonds.",
        description: "Interest Rates Increases by 3%. Bond holders watch out!",
        decreases: {
            tags: [],
            categories: ["Bond"],
            modifier: [0.14, 0.16],
        },
        increases: {
            tags: [],
            categories: ["Stock"],
            modifier: [0.04, 0.06],
        },
        newsHints: ["The Central Bank is looking to stimulate the economy."],
        duration: [2, 2],
    },
    {
        name: "Monetary Policy: Central Bank Decreases Reserve Requirements",
        description:
            "Interest Rates Decreases by 2.5%, Bond Holders watch out!",
        decreases: {
            tags: [],
            categories: ["Bond"],
            modifier: [0.13, 0.15],
        },
        increases: {
            tags: [],
            categories: ["Stock"],
            modifier: [0.04, 0.06],
        },
        newsHints: [
            "The Central Bank thinks the economy is a little too slow.",
        ],
        duration: [2, 2],
    },

    {
        name: "Government Increases Capital Taxes.",
        description:
            "Companies with large amounts of assets will experience increased expenses!",
        decreases: {
            tags: ["Capital Intensive"],
            categories: [],
            modifier: [0.04, 0.07],
        },
        newsHints: [
            "The government looks unfavorably towards polluting machinery!",
            "Government members discuss potential taxes on machinery",
        ],
        duration: [2, 3],
    },
    {
        name: "Government Lowers Capital Taxes",
        description:
            "Companies with large amounts of assets will experience decreased expenses!",
        increases: {
            tags: ["Capital Intensive"],
            categories: [],
            modifier: [0.04, 0.07],
        },
        newsHints: [
            "The government wishes to slash machinery costs to improve domestic industries",
            "Many companies pre-order new machinery in preparation for future tax changes",
        ],
        duration: [2, 3],
    },
    {
        name: "Government Subsidizes Capital Intensive Industries",
        description:
            "Companies with large amounts of assets will experience decreased expenses!",
        increases: {
            tags: ["Capital Intensive"],
            categories: [],
            modifier: [0.04, 0.07],
        },
        newsHints: [
            "Extra government funding directed towards jumpstarting the economy!",
            "Government plans to increase machinery production",
            "More government money put towards machinery production! Machine prices decrease greatly!",
        ],
        duration: [2, 3],
    },
    {
        name: "Fiscal Policy: Income taxes are set to drop 5%",
        description: "Consumers are set to have more disposable income!",
        decreases: {
            tags: ["Counter Cyclical"],
            categories: ["Bond"],
            modifier: [0.04, 0.05],
        },
        increases: {
            tags: [
                "Cyclical",
                "Raw Material Dependence",
                "Labor Dependent",
                "Capital Intensive",
            ],
            categories: [],
            modifier: [0.04, 0.05],
        },
        newsHints: ["Economy performing better than expected"],
        duration: [2, 3],
    },
    {
        name: "Global Economy Embraces Flourishing Growth",
        description: "Companies are expecting rising profits!",
        decreases: {
            tags: ["Counter Cyclical"],
            categories: ["Bond"],
            modifier: [0.04, 0.05],
        },
        increases: {
            tags: [
                "Cyclical",
                "Raw Material Dependence",
                "Labor Dependent",
                "Capital Intensive",
            ],
            categories: [],
            modifier: [0.04, 0.05],
        },
        newsHints: ["Economy performing better than expected"],
        duration: [2, 3],
    },
    {
        name: "Global Pandemic Strikes",
        description:
            "Consumers expecting significant decrease in disposable income!",
        decreases: {
            tags: ["Cyclical", "Raw Material Dependence", "Labor Dependent"],
            categories: [],
            modifier: [0.04, 0.05],
        },
        increases: {
            tags: ["Counter Cyclical"],
            categories: [],
            modifier: [0.04, 0.05],
        },
        newsHints: [
            "New strain of COVID-19 found, scientists are working on a cure",
            'Infection capabilities of recently discovered virus "COVID-20" unknown, scientists say',
        ],
        duration: [3, 6],
    },
    {
        name: "Imminent Recession Looming",
        description: "Consumers are looking to buy cheap!",
        increases: {
            tags: ["Counter Cyclical"],
            categories: [],
            modifier: [0.05, 0.06],
        },
        decreases: {
            tags: ["Cyclical"],
            categories: [],
            modifier: [0.05, 0.06],
        },
        newsHints: [
            "The economy seems to be slowing",
            "People begin saving more",
            "Fear of recessions linger",
        ],
        duration: [2, 3],
    },
    {
        name: "Widespread Drop in Tariffs",
        description: "Raw material prices drops!",
        increases: {
            tags: ["Raw Material Dependence"],
            categories: [],
            modifier: [0.04, 0.05],
        },
        newsHints: [
            "Governments starts negotiations on lowering tariffs for materials",
            "Tariffs on certain materials being removed!",
            "Materials may become cheaper, Stark University experts predict",
        ],
        duration: [2, 4],
    },
    {
        name: "Worker's Unions Demand Higher Wages!",
        description: "Corporations are pressured to increase all wages!",
        decreases: {
            tags: ["Labor Dependent"],
            categories: [],
            modifier: [0.04, 0.05],
        },
        newsHints: [
            "Tensions are escalating with workers' unions",
            "Workers on strike!",
            "Worker dissatisfaction hits record highs, says Stark University researchers",
        ],
        duration: [2, 4],
    },
    {
        name: "Minimum Wage Increasing",
        description: "Salaries now starting from $20/hr!",
        decreases: {
            tags: ["Labor Dependent"],
            categories: [],
            modifier: [0.04, 0.05],
        },
        newsHints: [
            "Murmurs suggest minimum wage workers are unsatisfied",
            "Government discuss potential minimum wage increases",
            "New policy changes increase minimum wage!",
        ],
        duration: [2, 4],
    },
    {
        name: "Strong Graduation Year",
        description: "Significant increase in number skilled workers!",
        increases: {
            tags: ["Labor Dependent"],
            categories: [],
            modifier: [0.04, 0.05],
        },
        newsHints: [
            "The upcoming graduates, set to complete their studies next month, appear to hold great promise as a future workforce",
            "Recent graduates are obtaining better educations than before, researchers at Stark University say",
        ],
        duration: [2, 4],
    },
];

export const randomNews: string[] = [
    "Dunder Mifflin branch manager Michael Scott retires at age 60!",
    "Dwight Schrute promoted to Assistant Regional Manager in Dunder Mifflin Scranton",
    "Kim's Convenience is starting a sitcom show!",
    "Los Pollos Hermanos rumored to sell new line of 'behind the counter' products!",
    "Los Pollos Hermanos starts extensive contruction project on secret underground labs!",
    "The Krusty Krab outperformed the Chum Bucket last quarter!",
    "The Krusty Krab thwarts another robbery attempt to steal the Secret Formula!",
    "Hogwarts Express plans to sell complementary Butter Beer!",
    "Stark Industries CEO Tony Stark  intends to feature in the next Marvel movie!",
    "Stratton Oakmont CEO Jordon Belfort, starred by Leonardo Dicaprio in upcoming movie!",
];
