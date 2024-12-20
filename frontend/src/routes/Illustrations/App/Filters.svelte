<script lang="ts">
    import Button from "../../Button.svelte";

    type Props = {
        src: string | ArrayBuffer | null | undefined;
        name: string | null;
    }

    const { src = $bindable(), name = $bindable() }: Props = $props();
</script>

<div class="flex gap-1.5">
    <Button class="!px-2.5 gap-1" tabindex={-1}>
        <span class="font-normal text-white/50 flex-none">Assigned to</span>
    
        <div class="inline-flex flex-row mx-0.5 flex-none">
            <img draggable="false" src="/placeholder2.jpg" alt="">
            <img class="-ml-1.5" draggable="false" src={src ? src.toString() : '/placeholder1.jpg'} alt="">
        </div>
    
        <span class="ellipsis">{name ?? 'Aarav'}</span>
        <span class="font-normal text-white/50">or</span> 
        Joshua
    </Button>

    <button aria-label="Add filter" class="size-7 rounded-md bg-transparent hover:bg-white/5 text-white/50 flex-none flex items-center justify-center" tabindex="-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4.5V8.00035M8 11.5V8.00035M8 8.00035L4.5 8M8 8.00035L11.5 8" stroke="white" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>            
    </button>
</div>

<style>
    img {
        @apply size-4 rounded ring-2 ring-[#404040];
    }
</style>