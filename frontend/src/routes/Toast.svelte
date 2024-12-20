<script lang="ts">
    import { blurInUpwards } from "$lib";
    import { onMount } from "svelte";

    let message: string | null = $state(null);
    let timeout: any;

    onMount(() => {
        document.addEventListener("alert", ((event: CustomEvent) => {
        message = event.detail;

        if (timeout)
            clearTimeout(timeout)

        timeout = setTimeout(() => message = null, 3000);
    }) as EventListener);
    })
</script>

{#if message}
    <main transition:blurInUpwards={{ duration: 80, transform: 'translateX(-50%)' }}>
        {@html message}
    </main>
{/if}

<style>
    main {
        @apply 
            fixed bottom-8 left-1/2 -translate-x-1/2
            z-50 w-fit h-7 rounded-md bg-[#404040] border border-white/[.025]
            flex px-2.5 items-center justify-center
            text-xs text-white font-medium leading-4 select-none;

        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 0px 0px rgba(255, 255, 255, 0.01);
    }
</style>