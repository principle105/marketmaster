<script lang="ts">
    import "./global.css";

    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import { themeChange } from "theme-change";
    import { Toaster } from "svelte-french-toast";

    import logo from "$lib/images/logo.png";

    interface Route {
        name: string;
        path: string;
    }

    // TODO: come up with a better solution

    let theme = false;

    onMount(() => {
        if (browser) {
            theme = localStorage.getItem("theme") === "light";
        }

        themeChange(false);
    });

    const routes: Route[] = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Leaderboard", path: "/leaderboard" },
        { name: "Stats for Nerds", path: "/stats-for-nerds" },
    ];

    $: isPlaying = $page.url.pathname.includes("/play");
</script>

<header
    class="fixed p-10 w-full flex justify-between items-center {!isPlaying &&
        'bg-base-100 z-50'}"
>
    <a href="/" class="flex items-center gap-5">
        <img
            src={logo}
            alt="Market Master Logo"
            class="h-[3.25rem] w-[3.25rem]"
        />
        {#if !isPlaying}
            <div class="mt-2 text-3xl font-bold">Market Master</div>
        {/if}
    </a>
    {#if !isPlaying}
        <div class="flex gap-14 items-center text-lg mt-4">
            {#each routes as { name, path }}
                <a
                    href={path}
                    class={$page.url.pathname === path
                        ? "text-primary"
                        : "opacity-80"}
                >
                    {name}
                </a>
            {/each}
        </div>
    {/if}
    <label class="swap swap-rotate">
        <input
            type="checkbox"
            data-toggle-theme="dracula,light"
            checked={theme}
        />
        <svg
            class="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
        </svg>
        <svg
            class="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
        </svg>
    </label>
</header>

<slot />

<Toaster />
