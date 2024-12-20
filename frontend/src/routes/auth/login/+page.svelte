<script lang="ts">
    import { onMount } from "svelte";
    import Button from "../../Button.svelte";
    import LeftDots from "../../Illustrations/LeftDots.svelte";
    import RightDots from "../../Illustrations/RightDots.svelte";
    import Toast from "../../Toast.svelte";
    import { showToast } from "$lib";

    let email = $state("duclit451@gmail.com");
    let password = $state("zxcvbnm0303");

    const login = (event: MouseEvent) => {
        if (!email) 
            return showToast("Email cannot be empty");

        if (!/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/.test(email))
            return showToast("Invalid email");

        if (!password)
            return showToast("Password cannot be empty");

        fetch("http://localhost:3301/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            credentials: 'include'
        })
            .then(async x => {
                const response = await x.json();

                if (response.error)
                    showToast(response.error);
                else
                    window.location.assign("/");
            });
    }

    onMount(() => {
        document.getElementById("email")?.focus();
    })
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
                <p class="text-xl leading-8 font-[550] text-white">Welcome to Intent.</p>
                <p class="text-[13px] leading-[22px] text-white/50">An issue tracker built for simplicity.</p>
            </div>

            <div class="flex flex-col">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="johndoe@gmail.com" bind:value={email} onkeydown={(e) => e.key === "Enter" && document.getElementById("pwd")?.focus()}>
            </div>

            <div class="flex flex-col">
                <div class="flex">
                    <label for="pwd">Password</label>
                    <a href="/forgot-password" class="ml-auto" tabindex="-1">Forgot password</a>
                </div>
                <input id="pwd" type="password" placeholder="••••••••••••••••" bind:value={password} onkeydown={(e) => e.key === "Enter" && document.getElementById("login")?.click()}>
            </div>

            <button id="login" class="mt-auto" onclick={login}>Login</button>
            <Button small class="!w-full -mt-2" onclick={() => window.location.assign("/create/account")}>I don't have an account</Button>
        </div>
        <div class="section">
            <RightDots></RightDots>

            <div class="feature mt-auto">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.25C11.4142 4.25 11.75 4.58579 11.75 5V7.00046H14C15.1046 7.00046 16 7.89589 16 9.00046V13.0005C16 15.2096 14.2091 17.0005 12 17.0005H10C7.79086 17.0005 6 15.2096 6 13.0005V9.00046C6 7.89589 6.89543 7.00046 8 7.00046H10.25V5C10.25 4.58579 10.5858 4.25 11 4.25ZM9 11.0005C9.55228 11.0005 10 10.5527 10 10.0005C10 9.44817 9.55228 9.00046 9 9.00046C8.44772 9.00046 8 9.44817 8 10.0005C8 10.5527 8.44772 11.0005 9 11.0005ZM12.2502 14.5252C12.6645 14.5252 13.0002 14.1894 13.0002 13.7752C13.0002 13.361 12.6645 13.0252 12.2502 13.0252H9.74978C9.33556 13.0252 8.99978 13.361 8.99978 13.7752C8.99978 14.1894 9.33556 14.5252 9.74978 14.5252H12.2502ZM14 10.0005C14 10.5527 13.5523 11.0005 13 11.0005C12.4477 11.0005 12 10.5527 12 10.0005C12 9.44817 12.4477 9.00046 13 9.00046C13.5523 9.00046 14 9.44817 14 10.0005Z" fill="#71D083"/>
                    <path d="M6 12L5.5 12C4.67157 12 4 11.3284 4 10.5V10.5C4 9.67157 4.67157 9 5.5 9L6 9L6 12Z" fill="#71D083"/>
                    <path d="M16 9H16.5C17.3284 9 18 9.67157 18 10.5V10.5C18 11.3284 17.3284 12 16.5 12H16V9Z" fill="#71D083"/>
                </svg>                 
                <div>
                    <h3>Powerful automations</h3>
                    <p>Easily build your own automations to enhance your team's workflow.</p>
                </div>   
            </div>

            <div class="feature">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.75C11.4142 4.75 11.75 5.08579 11.75 5.5C11.75 7.10894 12.2072 8.27154 12.9678 9.03217C13.7285 9.7928 14.8911 10.25 16.5 10.25C16.9142 10.25 17.25 10.5858 17.25 11C17.25 11.4142 16.9142 11.75 16.5 11.75C14.8911 11.75 13.7285 12.2072 12.9678 12.9678C12.2072 13.7285 11.75 14.8911 11.75 16.5C11.75 16.9142 11.4142 17.25 11 17.25C10.5858 17.25 10.25 16.9142 10.25 16.5C10.25 14.8911 9.7928 13.7285 9.03217 12.9678C8.27154 12.2072 7.10894 11.75 5.5 11.75C5.08579 11.75 4.75 11.4142 4.75 11C4.75 10.5858 5.08579 10.25 5.5 10.25C7.10894 10.25 8.27154 9.7928 9.03217 9.03217C9.7928 8.27154 10.25 7.10894 10.25 5.5C10.25 5.08579 10.5858 4.75 11 4.75Z" fill="#D19DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 4.5C6.77614 4.5 7 4.72386 7 5C7 5.42296 7.10538 5.64831 7.22852 5.77146C7.35165 5.8946 7.57697 6 7.99994 6C8.27608 6 8.49994 6.22386 8.49994 6.5C8.49994 6.77614 8.27608 7 7.99994 7C7.57697 7 7.35162 7.1054 7.22849 7.22854C7.10538 7.35166 7.00003 7.57692 7 7.99966C7 7.99976 7 7.99987 7 7.99997C7 7.99998 7 7.99999 7 8C7 8.27614 6.77615 8.49999 6.50002 8.5C6.22388 8.50001 6.00002 8.27617 6 8.00003C6 8.00002 6 8.00001 6 8C6 7.57709 5.8946 7.35173 5.77143 7.22856C5.64826 7.10539 5.42289 7 5 7C4.72386 7 4.5 6.77614 4.5 6.5C4.5 6.22386 4.72386 6 5 6C5.42289 6 5.64826 5.89461 5.77143 5.77144C5.8946 5.64827 6 5.42291 6 5C6 4.72386 6.22386 4.5 6.5 4.5Z" fill="#D19DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 13.5C15.7761 13.5 16 13.7239 16 14C16 14.423 16.1054 14.6483 16.2285 14.7715C16.3516 14.8946 16.577 15 16.9999 15C17.2761 15 17.4999 15.2239 17.4999 15.5C17.4999 15.7761 17.2761 16 16.9999 16C16.577 16 16.3516 16.1054 16.2285 16.2285C16.1054 16.3517 16 16.5769 16 16.9997C16 17.2758 15.7762 17.5 15.5 17.5C15.2239 17.5 15 17.2762 15 17C15 16.5771 14.8946 16.3517 14.7714 16.2286C14.6483 16.1054 14.4229 16 14 16C13.7239 16 13.5 15.7761 13.5 15.5C13.5 15.2239 13.7239 15 14 15C14.4229 15 14.6483 14.8946 14.7714 14.7714C14.8946 14.6483 15 14.4229 15 14C15 13.7239 15.2239 13.5 15.5 13.5Z" fill="#D19DFF"/>
                </svg>                                  
                <div>
                    <h3>AI powered agents</h3>
                    <p>Intent handles the boring tasks for you so you can focus on building.</p>
                </div>   
            </div>

            <div class="feature">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5C9.89543 5 9 5.89543 9 7V7.5H12C13.3807 7.5 14.5 8.61929 14.5 10V13H15C16.1046 13 17 12.1046 17 11V7C17 5.89543 16.1046 5 15 5H11Z" fill="#FEE7C6" fill-opacity="0.784314"/>
                    <rect x="5.75" y="9.75" width="6.5" height="6.5" stroke="#FEE7C6" stroke-opacity="0.784314" stroke-width="1.5" stroke-dasharray="2 2"/>
                </svg>                                   
                <div>
                    <h3>Unlimited members & issues</h3>
                    <p>Unlimited members and issues for a fixed monthly fee.</p>
                </div>   
            </div>
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

    input {
        @apply w-full h-7 rounded-md bg-[#3B3B3B] border border-white/[.025] text-white px-2 text-xs placeholder:text-white/50;

        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
            inset 0px -1px 0px 0px rgba(255, 255, 255, 0.01);
    }

    a {
        @apply text-[#70B8FF] text-xs font-[450] leading-[22px] select-none;
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

    div.feature {
        @apply w-full h-fit gap-1.5 flex;
    }

    div.feature > div {
        @apply w-full h-fit flex flex-col;
    }

    div.feature > svg {
        @apply flex-none;
    }

    div.feature > div > h3 {
        @apply text-[13px] leading-[22px] font-medium text-white;
    }

    div.feature > div > p {
        @apply text-xs leading-[22px] text-white/50;
    }
</style>