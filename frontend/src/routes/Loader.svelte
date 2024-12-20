<script lang="ts">
    const INTERVAL = 100; // milliseconds
    const WIDTH = 4;
    
    const opacities = [0.09, 0.10, 0.11];
    const randomOpacity = () => opacities[Math.floor(Math.random() * opacities.length)];

    let dots = $state(Array.from({ length: 10 }, () => randomOpacity()));
    let current = $state(0);

    const setOpacities = () => {
        dots = Array.from({ length: 10 }, () => randomOpacity());
        setTimeout(setOpacities, INTERVAL);

        current += 1;
        if (current > dots.length + WIDTH) {
            current = WIDTH;
        }
    }

    const getOpacity = (i: number, dot: number) => {
        if (
            (current >= i && current <= i + WIDTH - 1) 
            || (current > dots.length && current - dots.length > i)
        )
            return 0.5;
        else
            return dot;
    }

    setTimeout(setOpacities, INTERVAL);
</script>

<main class="flex gap-1.5">
    {#each dots as dot, i}
        <div class="size-1.5 bg-white" style:opacity={getOpacity(i, dot)}></div>
    {/each}
</main>