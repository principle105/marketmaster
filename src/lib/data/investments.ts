import dunderMifflinLogo from "$lib/images/dunder-mifflin.png";
import starkLogo from "$lib/images/stark.png";
import hogwartsLogo from "$lib/images/hogwarts.png";
import krustyCrabLogo from "$lib/images/krusty-krab.png";
import kimsLogo from "$lib/images/kims.png";
import losPollosHermanosLogo from "$lib/images/los-pollos-hermanos.png";
import strattonLogo from "$lib/images/stratton.png";
import bondLogo from "$lib/images/bond.png";
import etfLogo from "$lib/images/etf.png";

export const investmentCategories = [
    "Stock",
    "Exchange Traded Fund",
    "Bond",
] as const;

export const investmentTags = [
    "Capital Intensive",
    "Cyclical",
    "Counter Cyclical",
    "Raw Material Dependence",
    "Labor Dependent",
    "Interest Sensitive",
    "Inflation",
    "High Risk",
    "Risk",
    "Mid Risk",
    "Low Risk",
] as const;

export type InvestmentCategory = (typeof investmentCategories)[number];
export type InvestmentTag = (typeof investmentTags)[number];

export interface InvestmentData {
    name: string;
    description: string;
    logo: string;
    priceHistory: number[];
    colour: string;
    category: InvestmentCategory;
    tags: InvestmentTag[];
    owningPeriod: boolean[];
}

const investments: InvestmentData[] = [
    {
        name: "Stark Industries",
        description:
            "Stark Industries is the one of the only producers of electric vehicles, with the intent of reducing carbon emissions while helping customers save money otherwise spent on gas. While this company has great potential to monopolize car production, the general public as of now may be hesitant to purchase an electric vehicle, due to high initial costs. In addition, battery production is heavily dependent on raw materials shipped internationally, so shortages of such materials directly affect the supply of electric vehicles.",
        logo: starkLogo,
        priceHistory: [190],
        colour: "#bd0250",
        category: "Stock",
        tags: [
            "Capital Intensive",
            "Raw Material Dependence",
            "Interest Sensitive",
            "High Risk",
        ],
        owningPeriod: [],
    },
    {
        name: "Dunder Mifflin",
        description:
            "Dunder Mifflin is a paper wholesale company. The main factor that affects its financial stability is wood supply. Deforestation and tree shortage are its biggest enemy. Its main revenue stream is derived from contract-based salesmen who market its products to corporate clients.",
        logo: dunderMifflinLogo,
        priceHistory: [200],
        colour: "#d53e4f",
        category: "Stock",
        tags: [
            "Raw Material Dependence",
            "Capital Intensive",
            "Interest Sensitive",
            "High Risk",
        ],
        owningPeriod: [],
    },
    {
        name: "Hogwarts Express",
        description:
            "Hogwarts Express has commercialized its services and expanded into the taxicab industry for muggles. The company relies heavily on its drivers so changes in the market wage will greatly impact its expenses. Hogwart Express's growth is dependent on the general public's wealth levels. During recessions, consumers prefer to save money by taking public transit.",
        logo: hogwartsLogo,
        priceHistory: [160],
        colour: "#f46d43",
        category: "Stock",
        tags: ["Cyclical", "Labor Dependent", "Interest Sensitive", "Risk"],
        owningPeriod: [],
    },
    {
        name: "Krusty Krab",
        description:
            "Krusty Krab is an iconic fast seafood chain that boasts to be the sole proprietor of the Secret Formula. Because of its low prices, it will almost never have a shortage in demand. Because Krusty Krab doesn't plan on making any innovations, one can expect its profit margins to be steady. However, the stingy CEO of the Krusty Krab is afraid of rising wages, which could be detrimental to its expenses account. ",
        logo: krustyCrabLogo,
        priceHistory: [140],
        colour: "#fdae61",
        category: "Stock",
        tags: [
            "Interest Sensitive",
            "Counter Cyclical",
            "Labor Dependent",
            "Risk",
        ],
        owningPeriod: [],
    },
    {
        name: "Los Pollos Hermanos",
        description:
            "Los Pollos Hermanos is a fast food chain specializing in fried chicken. It is a direct competitor to the Krusty Krab. Due to its low prices, the company is a safe investment that thrives when consumers has a generally low propensity to spend. However, increasing worker wages could greatly impact its operations.",
        logo: losPollosHermanosLogo,
        priceHistory: [140],
        colour: "#fee08b",
        category: "Stock",
        tags: [
            "Interest Sensitive",
            "Counter Cyclical",
            "Labor Dependent",
            "Risk",
        ],
        owningPeriod: [],
    },
    {
        name: "Kim's Convenience",
        description:
            "Kim's Convenience, originally a convenience store, has expanded into a supermarket chain that is famous for providing locally sourced, fresh produce to customers at a reasonable price. It enjoys relatively inelastic demand and great financial stability. Even during economic turndowns or low-harvest seasons, it maintains a strong reputation as a reliable source of food for the general public, so profit margins remain fairly consistent.",
        logo: kimsLogo,
        priceHistory: [150],
        colour: "#e6f598",
        category: "Stock",
        tags: ["Interest Sensitive", "Labor Dependent", "Mid Risk"],
        owningPeriod: [],
    },
    {
        name: "The Stratton Oakmont ETF",
        description:
            "The Stratton Oakmont ETF is an index of top 100 former penny stock companies that now has market caps of over 1 billion dollars. Despite the strong diversification and company reputations, this is still a slightly risky investment.",
        logo: strattonLogo,
        priceHistory: [190],
        colour: "#abdda4",
        category: "Exchange Traded Fund",
        tags: ["Interest Sensitive", "Cyclical", "Mid Risk"],
        owningPeriod: [],
    },
    {
        name: "The Brownfield ETF",
        description:
            "The Brownfield ETF has a primary focus on mortgage-backed securities. Although hiking interest rates could have an adverse affect, this is a relatively safe investment. Since 2008, extra regulations have been put in place to ensure the product quality in this ETF. ",
        logo: etfLogo,
        priceHistory: [180],
        colour: "#66c2a5",
        category: "Exchange Traded Fund",
        tags: ["Interest Sensitive", "Cyclical", "Low Risk"],
        owningPeriod: [],
    },
    {
        name: "Five Year Treasury Note",
        description:
            "The 5 year treasury note yields a coupon rate of 4%. Relatively safe investment but very susceptible to unexpected inflation.",
        logo: bondLogo,
        priceHistory: [170],
        colour: "#3288bd",
        category: "Bond",
        tags: ["Interest Sensitive", "Mid Risk"],
        owningPeriod: [],
    },
    {
        name: "Two Year Treasury Note",
        description:
            "The 2 year treasury note yields a coupon rate of 2%. Very safe investment but susceptible to unexpected inflation.",
        logo: bondLogo,
        priceHistory: [160],
        colour: "#5e4fa2",
        category: "Bond",
        tags: ["Interest Sensitive", "Low Risk"],
        owningPeriod: [],
    },
];

export default investments;
