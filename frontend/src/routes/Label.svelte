<script lang="ts">
    import type { Color } from "$lib";

    type Props = {
        dashed?: boolean;
        color: Color;
        children: any;
    }
    
    let { dashed = false, color, children }: Props = $props();
</script>

<main class:dashed={dashed} class={color}>
    {@render children?.()}
</main>

<style>
    main {
        @apply 
            w-fit h-5 rounded flex items-center justify-center px-[5px]
            text-xs font-[550] leading-[18px] tracking-[0.03px] select-none;

        color: var(--text);
    }

    main:not(.dashed) {
        background: var(--bg-primary);
    }

    main.dashed {
        border: 1px dashed var(--border);
        background: var(--bg-secondary);
    }

    .red {
        --bg-primary: #FD201142;
        --bg-secondary: #FF55330F;
        --border: #FF4F3864;
        --text: #FF977D;
    }

    .orange {
        --bg-primary: #FF590039;
        --bg-secondary: #FE6D000E;
        --border: #FD75045C;
        --text: #FFA057;
    }

    .yellow {
        --bg-primary: #FDB70028;
        --bg-secondary: #F9B4000B;
        --border: #FEC40046;
        --text: #F5E147;
    }

    .green {
        --bg-primary: #11FF992D;
        --bg-secondary: #29F99D0B;
        --border: #71FF8F4B;
        --text: #3DD68C;
    }

    .lime {
        --bg-primary: #A7FE5C29;
        --bg-secondary: #78F7000A;
        --border: #B2FE6D46;
        --text: #BDE56C;
    }

    .cyan {
        --bg-primary: #00BAFF3B;
        --bg-secondary: #02A7F211;
        --border: #00C7FD5E;
        --text: #4CCCE6;
    }

    .blue {
        --bg-primary: #0075FF57;
        --bg-secondary: #1166FB18;
        --border: #0F89FD7F;
        --text: #70B8FF;
    }

    .violet {
        --bg-primary: #7D51FD50;
        --bg-secondary: #853FF916;
        --border: #8F6CFD6D;
        --text: #BAA7FF;
    }

    .purple {
        --bg-primary: #BB53FD42;
        --bg-secondary: #B744F714;
        --border: #C16DFD61;
        --text: #D19DFF;
    }

    .pink {
        --bg-primary: #F646FF3A;
        --bg-secondary: #F420BB12;
        --border: #F66DFF56;
        --text: #E796F3;
    }

    .gray {
        --bg-primary: #FFFFFF1B;
        --bg-secondary: #FFFFFF09;
        --border: #FFFFFF2C;
        --text: #FFFFFFAF;
    }

    .brown {
        --bg-primary: #FBBB8A24;
        --bg-secondary: #FBA67C0C;
        --border: #FDBA8741;
        --text: #DBB594;
    }
</style>