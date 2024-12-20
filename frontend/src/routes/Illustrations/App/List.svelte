<script lang="ts">
    import Task from "./Task.svelte";

    type Props = {
        src: string | ArrayBuffer | null | undefined;
        name: string | null;
    }

    const { src = $bindable(), name = $bindable() }: Props = $props();
</script>

<main 
    class="bg-white/[.025] border border-[rgba(255,255,255,0.02)] rounded-xl w-[340px] h-fit flex flex-col flex-none pb-1.5"
>
    <div class="w-full h-fit pt-2.5 px-[18px] flex flex-row gap-1.5 mb-1.5 items-center">
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="w-[calc(100%-16px-6px)] h-fit flex flex-row gap-1.5 items-center cursor-grab">
            <div class="size-2 rounded-full flex-none bg-[#E54D2E]"></div>
            <p class="text-xs text-black dark:text-white select-none leading-4 ellipsis max-w-full">
                Todo
            </p>
        </div>
    </div>
    <div class="w-full h-fit flex flex-col gap-1.5 mx-1.5 rounded-md">
        <Task 
            title="Debug and fix the issue with the API endpoint." 
            assignee={{
                name: name ?? 'Aarav',
                picture: src ? src.toString() : '/placeholder1.jpg',
            }}
            priority="high" 
            estimate={8} 
            labels={[
                { 
                    name: 'Backend', 
                    color: 'lime',
                }
            ]}
        ></Task>
        <Task 
            title="Revamp the User Interface (UI) of the Dashboard for Enhanced Data Visualization and Insights" 
            assignee={{
                name: 'Joshua',
                picture: '/placeholder2.jpg',
            }}
            priority="medium" 
            estimate={32} 
            labels={[
                { 
                    name: 'Design', 
                    color: 'cyan',
                },
                {
                    name: 'Frontend',
                    color: 'brown',
                }
            ]}
        ></Task>
        <Task 
            title="Perform a thorough security audit and vulnerability assessment of the application" 
            assignee={{
                name: 'Joshua',
                picture: '/placeholder2.jpg',
            }}
            priority="high" 
            estimate={16} 
            labels={[
                { 
                    name: 'Cybersec', 
                    color: 'violet',
                }
            ]}
        ></Task>
        <Task 
            title="Produce High-Fidelity Wireframes and Interactive Prototypes for Client Review." 
            assignee={{
                name: 'Joshua',
                picture: '/placeholder2.jpg',
            }}
            priority="low" 
            estimate={32} 
            labels={[
                { 
                    name: 'Design', 
                    color: 'cyan',
                },
                {
                    name: 'Frontend',
                    color: 'brown',
                }
            ]}
        ></Task>
    </div>
</main>