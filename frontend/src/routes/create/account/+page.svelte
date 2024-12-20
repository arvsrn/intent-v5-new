<script lang="ts">
    import { showToast } from "$lib";
    import Button from "../../Button.svelte";
    import App from "../../Illustrations/App/App.svelte";
    import LeftDots from "../../Illustrations/LeftDots.svelte";
    import Toast from "../../Toast.svelte";

    let username = $state("Aarav Sareen");
    let handle = $state("arvsrn");

    let email = $state("duclit451@gmail.com");
    let password = $state("zxcvbnm0303");

    let picture: File | null = $state(null);
    let src: string | ArrayBuffer | null | undefined = $state(null);

    // two stages: email/password and username/handle
    // this variable is false for the first, true for the second
    let stage = $state(false);

    const validateEmailAndPassword = () => {
        if (!email) 
            return showToast("Email cannot be empty");

        if (!/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/.test(email))
            return showToast("Invalid email");

        if (!password)
            return showToast("Password cannot be empty");

        stage = true;
    }

    const validateUsernameAndHandle = () => {
        if (!username)
            return showToast("Username cannot be empty");

        if (!handle)
            return showToast("Handle cannot be empty");

        if (!/^[a-zA-Z0-9_]+$/.test(handle))
            return showToast("Handle can only contain alphabets, numbers & underscores");

        createAccount();
    }

    const inputFile = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';

        fileInput.onchange = async () => {
            const file = (fileInput?.files ?? [])[0];

            if (file) {
                picture = file;
            }
        };

        fileInput.click();
    }

    const createAccount = () => {
        fetch("http://localhost:3301/create/account", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                username,
                handle,
                file: src,
            }),
        })
            .then(async x => {
                const response = await x.json();

                if (response.error)
                    showToast(response.error);
                else
                    // after account creation, user is directed to login page
                    window.location.assign("/auth/login");
            });
    }

    // TODO: transition
    function fade(node: HTMLElement, { delay = 0, duration = 100, direction = 'left' }) {
        return {
            delay,
            duration,
            css: (t: number) => `
                transform: translateX(${32*(1-t)*(direction === 'left' ? 1 : -1)}px);
                opacity: ${0.5 + (0.5) * t}
            `
        };
    }

    $effect(() => {
        if (stage)
            document.getElementById("username")?.focus();
        else 
            document.getElementById("email")?.focus();
    });

    $effect(() => {
        if (picture) {
            const reader = new FileReader();
            reader.onload = (e) => {
                src = e.target?.result;
            }
            reader.readAsDataURL(picture);
        } else {
            src = "";
        }
    });

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && stage) {
            stage = false;
        }
    }

    let displayName: string | null = $state(null);

    $effect(() => {
        displayName = username.split(' ')[0];

        if (!username) 
            displayName = "Aarav";
    });
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
                <p class="text-xl leading-8 font-[550] text-white">Create your account.</p>
                <p class="text-[13px] leading-[22px] text-white/50">This is how people will see you on Intent.</p>
            </div>

            {#if !stage}
                <div in:fade={{ direction: 'right' }} class="flex flex-col gap-4 h-full">
                    <div class="flex flex-col">
                        <label for="email">Email</label>
                        <input id="email" type="text" placeholder="johndoe@gmail.com" bind:value={email} onkeydown={(e) => e.key === "Enter" && document.getElementById("pwd")?.focus()}>
                    </div>
    
                    <div class="flex flex-col">
                        <label for="pwd">Password</label>
                        <input id="pwd" type="password" placeholder="••••••••••••••••" bind:value={password} onkeydown={(e) => e.key === "Enter" && validateEmailAndPassword()}>
                    </div>
                </div>

                <button id="login" class="mt-auto flex-none" onclick={validateEmailAndPassword}>Next</button>
                <Button small class="!w-full -mt-2" onclick={() => window.location.assign("/auth/login")}>I already have an account</Button>
            {:else}
                <div in:fade={{}} class="flex flex-col gap-4 h-full">
                    <div class="flex flex-row items-center gap-2.5">
                        {#if src}
                            <img class="size-8 rounded-md select-none" draggable="false" src={src.toString()} alt="">
                        {:else}
                            <div class="size-8 rounded-md bg-[#3B3B3B] border border-white/[.025] flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM9.99896 6C9.99896 7.10457 9.10353 8 7.99896 8C6.89439 8 5.99896 7.10457 5.99896 6C5.99896 4.89543 6.89439 4 7.99896 4C9.10353 4 9.99896 4.89543 9.99896 6ZM4.26165 11.3647C3.93578 10.9981 4.01995 10.4398 4.42552 10.164C5.47172 9.45254 6.69398 9.04395 7.99974 9.04395C9.3055 9.04395 10.5278 9.45254 11.574 10.164C11.9795 10.4398 12.0637 10.9981 11.7378 11.3647C10.822 12.3949 9.48665 13.0439 7.99974 13.0439C6.51283 13.0439 5.17751 12.3949 4.26165 11.3647Z" fill="white" fill-opacity="0.5"/>
                                </svg>        
                            </div>
                        {/if}
                        
                        {#if src}
                            <Button small onclick={inputFile}>Upload</Button>
                            <Button small onclick={() => picture = null} class="-ml-1">Remove</Button>
                        {:else}
                            <Button small onclick={inputFile}>Upload profile picture</Button>
                        {/if}
                    </div>
    
                    <div class="flex flex-col">
                        <label for="username">Username</label>
                        <input id="username" type="text" placeholder="Aarav Sareen" bind:value={username} onkeydown={(e) => e.key === "Enter" && document.getElementById("handle")?.focus()}>
                    </div>
    
                    <div class="flex flex-col">
                        <label for="handle">Handle</label>
                        <input id="handle" type="text" placeholder="arvsrn" bind:value={handle} onkeydown={(e) => e.key === "Enter" && validateUsernameAndHandle()}>
                    </div>
                </div>

                <button class="mt-auto flex-none" onclick={validateUsernameAndHandle}>Create account</button>
                <Button small class="!w-full -mt-2" onclick={() => stage = false}>Back</Button>
            {/if}
        </div>
        <div class="section !pr-0 !pb-0">
            <App bind:src={src} bind:name={displayName}></App>
        </div>
    </div>
</main>

<Toast />
<svelte:window onkeydown={onKeyDown} />

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

    input {
        @apply w-full h-7 rounded-md bg-[#3B3B3B] border border-white/[.025] text-white px-2 text-xs placeholder:text-white/50;

        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 0px 0px rgba(255, 255, 255, 0.01);
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