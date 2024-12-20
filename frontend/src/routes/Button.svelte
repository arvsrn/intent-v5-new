<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";

    type Props = {
        class?: string;
        small?: boolean;
        onclick?: MouseEventHandler<HTMLButtonElement>,
        children: any;
        tabindex?: number;
    }
    
    let { children, class: className = "", small = false, onclick = (event: MouseEvent) => {}, tabindex = 0 }: Props = $props();
</script>

<button class={className} class:small={small} {onclick} {tabindex}>
    {@render children?.()}
</button>

<style>
    button {
        @apply 
            w-fit h-7 px-2 flex items-center justify-center flex-none
            bg-white/[.075] border border-white/[.025] rounded-md
            text-xs font-[550] leading-5 tracking-[-0.024px] text-white select-none;

        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 0px 0px rgba(255, 255, 255, 0.01);
    }

    button:hover, button:active {
        @apply bg-white/[0.125];
    }

    button:focus-visible {
        @apply outline-none ring-2 ring-offset-2 ring-offset-[#202020] ring-blue-500/50;
    }

    .small {
        @apply px-1.5 h-6;
    }
</style>