import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const defaultValue = 0;

const getInitialValue = () => {
    if (browser) {
        const storedValue = window.localStorage.getItem("tutorialFinished");

        if (storedValue) {
            const intValue = parseInt(storedValue);

            if (!isNaN(intValue)) {
                return intValue;
            }
        }
    }

    return defaultValue;
};

const initialValue = getInitialValue();

const tutorialStage = writable<number>(initialValue);

tutorialStage.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem("tutorialFinished", value.toString());
    }
});

export default tutorialStage;
