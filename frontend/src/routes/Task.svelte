<script lang="ts">
    import type { Task } from "$lib";

    type Props = {
        task: Task;
        draggable?: boolean;
    }
    
    const { task, draggable = false }: Props = $props();
</script>

<main>
    
</main>

<style>
    main {
        @apply 
            bg-white/[.075] border border-white/[.02] w-full h-fit
            ;

        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 0px 0px rgba(255, 255, 255, 0.01);
    }
</style>