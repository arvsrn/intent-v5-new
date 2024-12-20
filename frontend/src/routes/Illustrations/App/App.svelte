<script lang="ts">
    import Filters from "./Filters.svelte";
    import List from "./List.svelte";
    import Navigation from "./Navigation.svelte";

    type Props = {
        src: string | ArrayBuffer | null | undefined;
        name: string | null;
        workspaceName?: string;
    }

    const { src = $bindable(), name = $bindable(), workspaceName = "Runic" }: Props = $props();
</script>

<main class="size-full bg-[#313131] border-l border-t border-white/[.075] rounded-tl-xl flex flex-col gap-4 p-4 overflow-hidden">
    <Navigation {workspaceName}></Navigation>
    <Filters {src} {name}></Filters>
    <List {src} {name}></List>
</main>