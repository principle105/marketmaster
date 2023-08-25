<script lang="ts">
    import heroImage from "$lib/images/hero.png";
</script>

<section class="pt-32">
    <div
        class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
    >
        <div class="mr-auto place-self-center lg:col-span-8">
            <h1
                class="mb-4 text-4xl font-bold tracking-tight !leading-[1.1] md:text-5xl xl:text-6xl"
            >
                Improving Financial Literacy Through
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                >
                    Interactive Learning
                </span>
            </h1>
            <p class="mb-6 opacity-70 lg:mb-8 md:text-lg lg:text-xl">
                Market Master aims to tackle the problem of financial
                illiteracy. It integrates robust economic theory into a
                captivating gaming experience that hones investing acumen.
            </p>
            <a class="btn btn-primary" href="/play">Start Playing</a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-4 lg:flex">
            <img src={heroImage} alt="mockup" />
        </div>
    </div>
</section>
