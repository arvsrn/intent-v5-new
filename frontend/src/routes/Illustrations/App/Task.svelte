<script lang="ts">
    import { blurInUpwards, type Color, type Task } from "$lib";
    import Label from "../../Label.svelte";
    import { Tooltip } from "bits-ui";

    type Props = {
        title: string;
        assignee: {
            name: string;
            picture: string;
        };
        priority: 'high' | 'medium' | 'low';
        estimate: number;
        labels: Array<{
            name: string;
            color: Color;
        }>;
    }
    
    const { title, assignee, priority, estimate, labels }: Props = $props();
</script>

<main>
    <p class="text-[13px] leading-5 text-white">{title}</p>

    <div class="w-full h-fit flex flex-row flex-wrap items-center gap-2">
        <div class="flex gap-1 items-center">
            <img class="size-4 select-none rounded" draggable="false" src={assignee.picture} alt="">
            <p class="text-xs leading-4 text-white sekect-none">{assignee.name}</p>
        </div>
        
        {#if priority === 'high'}
            <Label color="red" dashed>High</Label>
        {:else if priority === 'medium'}
            <Label color="yellow" dashed>Medium</Label>
        {:else}
            <Label color="green" dashed>Low</Label>
        {/if}

        <p class="text-xs text-white/50 select-none">{estimate}pt</p>

        {#each labels as label}
            <Label color={label.color}>{label.name}</Label>
        {/each}
    </div>
</main>

<style>
    main {
        @apply 
            bg-white/[.075] border border-white/[.02] w-full h-fit
            flex flex-col gap-2.5 px-3 py-2 rounded-md;

        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 0px 0px rgba(255, 255, 255, 0.01);
    }

    /* TODO: remove this from here */
    :global(.tooltip) {
        @apply 
            z-50 w-fit h-6 rounded-md bg-[#606060] border border-white/[.025]
            flex px-2 items-center justify-center
            text-xs text-white font-medium leading-4 select-none;

        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 0px 0px rgba(255, 255, 255, 0.01);
    }
</style>