<script lang="ts">
    interface Definition {
        term: string;
        definition: string;
        link: string;
    }

    let definitions: Definition[] = [
        {
            term: "Stock",
            definition:
                "A stock represents a share of ownership/equity of a company.",
            link: "https://www.investopedia.com/terms/s/stock.asp",
        },
        {
            term: "Bond",
            definition:
                "A debt instrument representing a loan owed to the bond owner.",
            link: "https://www.investopedia.com/terms/b/bond.asp",
        },
        {
            term: "ETF",
            definition:
                "An exchange-traded fund is a collection of similar financial assets.",
            link: "https://www.investopedia.com/terms/e/etf.asp",
        },
        {
            term: "Interest Rate",
            definition: "The cost of borrowing money.",
            link: "https://www.investopedia.com/terms/i/interestrate.asp",
        },
        {
            term: "Inflation",
            definition: "The annual rate at which product/service prices rise.",
            link: "https://www.investopedia.com/terms/i/inflation.asp",
        },
        {
            term: "Cyclical",
            definition:
                "A stock whose trend adheres closely to economic fluctuations.",
            link: "https://www.investopedia.com/terms/c/cyclicalstock.asp",
        },
        {
            term: "Fiscal Policy",
            definition:
                "Measures enacted by the government to control the economy.",
            link: "https://www.investopedia.com/terms/f/fiscalpolicy.asp",
        },
        {
            term: "Monetary Policy",
            definition:
                "Measures enacted by the Central Bank to control the economy.",
            link: "https://www.investopedia.com/terms/m/monetarypolicy.asp",
        },
        {
            term: "GDP",
            definition:
                "Gross Domestic Product is the monetary measure of all goods/services produced in a country within a certain time period.",
            link: "https://www.investopedia.com/terms/g/gdp.asp",
        },
        {
            term: "Recession",
            definition:
                "A period of temporary economic decline generally indicated by a fall in GDP.",
            link: "https://www.investopedia.com/terms/r/recession.asp",
        },
        {
            term: "Disposable Income",
            definition:
                "The amount of money leftover to spend or save after taxes.",
            link: "https://www.investopedia.com/terms/d/disposableincome.asp",
        },
        {
            term: "Profit Margin",
            definition:
                "The portion of a company's sales revenue that becomes profit, after subtracting all costs",
            link: "https://www.investopedia.com/terms/p/profitmargin.asp",
        },
    ];
</script>

<section>
    <h1 class="text-4xl font-bold mb-5">Definitions</h1>
    <div class="grid grid-cols-3 gap-3">
        {#each definitions as { term, definition, link }}
            <a href={link} target="_blank" rel="noopener noreferrer">
                <div
                    class="p-4 h-full bg-base-200 hover:bg-base-300 transition-colors rounded-md duration-200"
                >
                    <div class="font-bold mb-1 text-[1.075rem]">{term}:</div>
                    <div class="text-sm opacity-80">
                        {definition}
                    </div>
                </div>
            </a>
        {/each}
    </div>
</section>
