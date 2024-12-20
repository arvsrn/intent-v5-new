<script lang="ts">
    import { onMount } from "svelte";
	import Button from "./Button.svelte";
	import Filter from "./Filter.svelte";
    import Navigation from "./Navigation.svelte";
    import Loader from "./Loader.svelte";
    import { blurInDownwards } from "$lib";

    let loading = $state(true);
    let unreachable = $state(false);

    onMount(async () => {
        // check if server is online
        fetch("http://localhost:3301/ping")
            .then(x => {
                const websocket = new WebSocket("ws://localhost:3301/websocket");
    
                // websocket connection is refused by the server if session cookie is invalid.
                // hence, session cookie is deleted by the server and user is redirected to /auth/login
                websocket.onerror = () => {
                    window.location.assign("/auth/login");
                }
            
                websocket.onopen = () => {
                    loading = false;
                }
            })
            .catch(x => unreachable = true);
    })
</script>

{#if loading}
    <main class="w-screen h-screen bg-[#202020] flex items-center justify-center">
        <div class="flex relative">
            <Loader></Loader>

            {#if unreachable}
                <div transition:blurInDownwards={{ duration: 120, transform: 'translateX(-50%)' }} class="flex flex-row flex-none w-[68px] gap-1 items-center justify-center absolute top-4 left-1/2 -translate-x-1/2">
                    <svg class="text-[#FFA057] flex-none" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.86113 2.43572C8.47194 1.78682 7.53096 1.78852 7.14412 2.43883L1.16581 12.4887C0.769286 13.1553 1.24964 14 2.02524 14H14.0312C14.8084 14 15.2885 13.1522 14.8887 12.4856L8.86113 2.43572ZM7 5C7 4.44772 7.44772 4 8 4C8.55228 4 9 4.44772 9 5V8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8V5ZM7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11V12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12V11Z" fill="currentColor"/>
                    </svg>
                    <p class="text-xs text-white/75 select-none flex-none">
                        Server is offline. 
                        <a href="https://www.x.com/arvsrn" class="text-[#70B8FF] text-xs font-[450] leading-[22px] select-none">Message support</a>.
                    </p>                    
                </div>
            {/if}
        </div>
    </main>
{:else}
    <main class="w-screen h-screen bg-[#202020] flex">
        <nav class="w-60 h-full bg-[#1E1E1E] border-r border-white/5 flex-none"></nav>
        <div class="size-full flex flex-col">
            <div class="w-full h-fit p-4 flex">
                <Navigation workspace="Runic" project="Components" view="All Issues"></Navigation>
                <Button class="ml-auto">Invite</Button>
            </div>
            <div class="w-full h-fit p-4 pt-0 flex">
                <Filter></Filter>
                <Button class="ml-auto">New issue</Button>
            </div>
            <div class="py-16 w-full h-fit flex flex-col gap-1.5 items-center justify-center">
                
            </div>
        </div>
    </main>
{/if}