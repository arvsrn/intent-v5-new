<!-- TODO: write description -->

<script lang="ts">
    interface Props {
        workspace: string;
        project?: string;
        view?: string;
    }

    const { workspace, project, view }: Props = $props();
</script>

<nav class="flex items-center">
    <button>
        <div class="size-4 rounded-md bg-[#0C8CE9] -ml-0.5"></div>
        {workspace}
    </button>
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    <button>
        <div class="size-4 rounded-md bg-[#F24822] -ml-0.5"></div>
        {project}
    </button>
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    <button>{view}</button>
</nav>

<style>
    button {
        @apply 
            h-[30px] w-fit px-2 flex items-center gap-1.5
            text-white text-xs leading-5 font-medium tracking-[-0.024px] select-none
            rounded-lg;
    }

    button:hover, button:active {
        @apply bg-white/5;
    }

    svg {
        @apply text-white/50;
    }
</style>