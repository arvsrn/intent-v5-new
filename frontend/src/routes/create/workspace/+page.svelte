<script lang="ts">
    import { showToast } from "$lib";
    import Button from "../../Button.svelte";
    import App from "../../Illustrations/App/App.svelte";
    import LeftDots from "../../Illustrations/LeftDots.svelte";
    import Toast from "../../Toast.svelte";

    let workspaceName = $state("Runic");
    let workspaceUrl = $state("runic");
    let workspaceIdentifier = $state("RUN");

    const setValues = (name: string) => {
        workspaceIdentifier = name.substring(0, Math.min(5, name.length)).toUpperCase();
        workspaceUrl = name.length ? `${name.split(' ')[0].toLowerCase()}` : '';
    }

    const validateWorkspaceName = () => {
        if (!workspaceName)
            return showToast("Workspace name cannot be empty");

        if (!workspaceUrl)
            return showToast("Workspace URL cannot be empty");

        if (!/^[a-zA-Z0-9_]+$/.test(workspaceUrl))
            return showToast("Woekspace URL can only contain alphabets, numbers & underscores");

        if (!workspaceIdentifier) 
            return showToast("Workspace identifier cannot be empty");

        createWorkspace();
    }

    const createWorkspace = () => {
        fetch("http://localhost:3301/create/workspace", {
            method: "POST",
            body: JSON.stringify({
                name: workspaceName,
                url: workspaceUrl,
                identifier: workspaceIdentifier,
            }),
        })
            .then(async x => {
                const response = await x.json();

                if (response.error)
                    showToast(response.error);
                else
                    // after account creation, user is directed to home
                    window.location.assign("/");
            });
    }

    $effect(() => {
        setValues(workspaceName);
    });

    $effect(() => {
        workspaceIdentifier = workspaceIdentifier.toUpperCase();
    })

    const onIdentifierKeydown = (event: KeyboardEvent) => {
        if (["A", "a"].includes(event.key) && event.ctrlKey)
            return;
        
        if (!["Backspace", "Delete", "ArrowLeft", "ArrowDown", "ArrowRight", "ArrowTop"].includes(event.key)) {
            if (workspaceIdentifier.length === 5)
                return event.preventDefault();
        }

        if (event.key === "Enter") validateWorkspaceName()
    }
</script>

<main class="w-screen h-screen bg-[#202020] flex items-center justify-center">
    <div class="container">
        <div class="section border-r border-white/5 bg-white/[.025]">
            <LeftDots></LeftDots>

            <svg class="flex-none" width="66" height="30" viewBox="0 0 66 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0H30V6H24V0Z" fill="#EEEEEE"/>
                <path d="M24 12H30V18H24V12Z" fill="#EEEEEE"/>
                <path d="M12 12H18V18H12V12Z" fill="#EEEEEE"/>
                <path d="M12 24H18V30H12V24Z" fill="#EEEEEE"/>
                <path d="M0 24H6V30H0V24Z" fill="#EEEEEE"/>
                <path d="M36 0H42V6H36V0Z" fill="#EEEEEE"/>
                <path d="M36 12H42V18H36V12Z" fill="#EEEEEE"/>
                <path d="M48 12H54V18H48V12Z" fill="#EEEEEE"/>
                <path d="M48 24H54V30H48V24Z" fill="#EEEEEE"/>
                <path d="M60 24H66V30H60V24Z" fill="#EEEEEE"/>
            </svg>

            <div class="flex flex-col">
                <p class="text-xl leading-8 font-[550] text-white">Create workspace.</p>
                <p class="text-[13px] leading-[22px] text-white/50">You can invite your team and create projects under this workspace.</p>
            </div>

            <div class="flex flex-col gap-4 h-full">
                <div class="flex flex-col">
                    <label for="name">Workspace name</label>
                    <input id="name" type="text" placeholder="Intent" bind:value={workspaceName} onkeydown={(e) => e.key === "Enter" && document.getElementById("url")?.focus()}>
                </div>

                <div class="flex flex-col">
                    <label for="url">Workspace URL</label>
                    <div class="input">
                        <label for="url">https://www.</label>
                        <input class="transparent" id="url" type="text" placeholder="intent.intent.app" bind:value={workspaceUrl} onkeydown={(e) => e.key === "Enter" && document.getElementById("id")?.focus()}>
                        <label for="url">.intent.app</label>
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="id">Workspace Identifier</label>
                    <label for="id" class="!text-white/50 !font-normal mb-0.5">This will be prefixed before issue IDs. For example: {workspaceIdentifier ? workspaceIdentifier : 'INTENT'}-59.</label>
                    <input onkeydown={onIdentifierKeydown} id="id" type="text" placeholder="INTENT" bind:value={workspaceIdentifier}>
                </div>
            </div>

            <button id="login" class="mt-auto flex-none" onclick={validateWorkspaceName}>Create workspace</button>
        </div>
        <div class="section !pr-0 !pb-0">
            <!-- todo: user data should be saved -->
            <App src="" name="Aarav" workspaceName={workspaceName}></App>
        </div>
    </div>
</main>

<Toast />

<style>
    div.container {
        @apply w-[600px] h-[500px] rounded-xl bg-white/[.025] border border-white/5 flex flex-row overflow-hidden;
    }

    div.section {
        @apply w-[300px] h-full flex flex-col gap-4 p-5 overflow-hidden relative;
    }

    label {
        @apply text-xs leading-[22px] font-medium text-white select-none;
    }

    input, div.input {
        @apply w-full h-7 rounded-md bg-[#3B3B3B] border border-white/[.025] text-white px-2 text-xs placeholder:text-white/50;

        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 0px 0px rgba(255, 255, 255, 0.01);
    }

    div.input:focus-within {
        @apply outline-none ring-2 ring-offset-2 ring-offset-[#202020] ring-blue-500/50;
    }

    div.input {
        @apply flex flex-row items-center;
    }

    div.input > label {
        @apply flex text-white/50 select-none w-fit;
    }

    input.transparent {
        @apply bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-full px-0;
    }

    input#id {
        text-transform: uppercase;
    }

    button {
        @apply w-full h-7 rounded-md bg-[#0090FF] text-white px-2 text-xs font-[650] hover:bg-[#3B9EFF] active:bg-[#3B9EFF];

        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 0px 0px rgba(255, 255, 255, 0.01);
    }

    button:focus-visible,
    input:focus-visible {
        @apply outline-none ring-2 ring-offset-2 ring-offset-[#202020] ring-blue-500/50;
    }
</style>