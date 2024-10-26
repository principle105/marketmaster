<script lang="ts">
    import Katex from "./Katex.svelte";

    const equation1 = `\\text{Expected Return (ER)} = \\frac{\\sum_{t=1}^{n} t \\times \\frac{CF_t}{(1 + YTM)^t}}{\\text{Current Bond Price}}`;
    const equation2 = `\\text{Modified Duration} = \\text{Risk-Free Rate} + \\beta \\times (\\text{Market Return} - \\text{Risk-Free Rate})`;
    const equation3 = `P_0 = \\frac{C_1}{(1 + \\text{ytm})^1} + \\frac{C_2}{(1 + \\text{ytm})^2} + \\ldots + \\frac{C_n + \\text{Par}}{(1 + \\text{ytm})^n}`;
</script>

<main class="flex flex-col pt-44">
    <div class="max-w-screen-lg mx-auto">
        <section class="mb-32">
            <h2 class="text-6xl font-bold text-center mb-14">
                Stats for Nerds
            </h2>

            <h3 class="font-semibold mb-6 text-4xl">Underlying Assumptions:</h3>
            <p class="opacity-70 mb-6 text-lg">
                We assume “ceteris paribus” (all else is equal) in any event to
                ensure relative simplicity. Below are other figures we used for
                calculations.
            </p>
            <h4 class="font-semibold text-2xl mb-0.5">Market Risk Premium:</h4>
            <p class="text-lg mb-6 opacity-70">5%</p>
            <h4 class="font-semibold text-2xl mb-0.5">
                Required Rate of Return:
            </h4>
            <p class="text-lg mb-6 opacity-70">
                We assumed that higher-risk investors expect higher returns.
                Required rates range from 15% to 3% depending on the risk levels
                of the investment.
            </p>
            <h4 class="font-semibold text-2xl mb-0.5">Risks:</h4>
            <p class="text-lg mb-10 opacity-70">
                Companies with differing risk exposure are assigned different
                beta values (covariance divided by variance of asset returns
                relative to the benchmark). The beta values employed in our
                calculations range from 0.5 (least risky) to 2.0 (most risky)
            </p>

            <h3 class="font-semibold mb-6 text-4xl">
                Factors Affecting Stock Performance:
            </h3>

            <p class="opacity-70 mb-4 text-lg">
                Each investment is tagged with one or more labels (below) that
                determine which events would affect its performance. The degree
                of impact directly correlates with its assigned risk values.
            </p>
            <div class="text-lg opacity-70 font-bold mb-10">
                #Capital intensive, #Cyclical, #Counter Cyclical, #Raw Material
                Dependence, #Labor dependent, #Interest sensitive, #Inflation
            </div>

            <h3 class="font-semibold mb-6 text-4xl">Calculations:</h3>

            <p class="opacity-70 mb-6 text-lg">
                The exact figures for the simulation are calculated with the
                formulas below. We use random values to create margins of error
                for the figures calculated so there is a controlled degree of
                “luck” in the game that simulates a real stock market.
            </p>
            <p class="opacity-70 mb-8 text-lg">
                <u>Interest rate effect on bonds:</u>
                Modified Duration Formula
            </p>
            <div
                style="--katex-fontsize: 2.25rem"
                class="flex justify-center mb-8"
            >
                <Katex math={equation1} />
            </div>

            <p class="opacity-70 mb-8 text-lg">
                <u>Interest rate effect on stocks:</u>
                Capital Asset Pricing Model
            </p>
            <div
                style="--katex-fontsize: 1.5rem"
                class="flex justify-center mb-8"
            >
                <Katex math={equation2} />
            </div>

            <p class="opacity-70 mb-10 text-lg">
                <u>Inflation effect on bonds:</u>
                Discounted Cash Flow
            </p>
            <div style="--katex-fontsize: 2.25rem" class="flex justify-center">
                <Katex math={equation3} />
            </div>
        </section>
    </div>
</main>
