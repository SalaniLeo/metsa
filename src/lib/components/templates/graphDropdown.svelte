<script lang="ts">
	import { savePreferences } from "$lib";
	import { user } from "$lib/userData.svelte";

    let { title, elements, selected = $bindable() } = $props()

    let hovered = $state();

    function elementClicked(element: any) {
        selected.includes(element) ? selected = selected.filter((el: any) => el != element) : selected.push(element)
        savePreferences(user.preferences)
    }

    let selector = $state<HTMLElement>()
    let height: any = $state()

</script>

<svelte:body bind:clientHeight={height}></svelte:body>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="GraphDropdown wrapper radius-medium bg-tertiary min-content" onmouseenter={() => hovered = true} onmouseleave={() => hovered = false}>
    <div class="flexrow gap2 valign">
        <p class="padding2 bg-secondary radius-medium border bg-terthiary-hover" bind:this={selector}>{title}</p>
    </div>
    <div class="GraphDropdown-body scroll border bg-secondary radius"
        style={selector?.getBoundingClientRect().y + 316 > height ? `top: calc(-300px - 1rem)` : "top: 100%"}
        class:show={hovered}>
        {#each Object.keys(elements).filter((item: any) => !Object.keys(selected).includes(item)) as element}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <p onclick={() => {
                elementClicked(element)
            }} class="GraphDropdown-item radius-light bg-terthiary-hover">{element}</p>
        {/each}
    </div>
</div>
<div class="valign gap2 flexrow-responsive">
    {#each selected as preference}
        <div class="flexrow gap2 selected-data bg-secondary padding2 radius-medium border">
            {preference}
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button onclick={() => {elementClicked(preference)}} class="transparent valign">
                <svg width=20 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="var(--font-secondary-color)" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="var(--font-primary-color)" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            </button>
        </div>
    {/each}
    {#if Object.keys(selected).length > 5}
        <button class="valign secondary transparent fit-content" onclick={() => {
            selected = []
        }}>reset</button>
    {/if}
</div>

<style>

    .GraphDropdown {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .GraphDropdown-body {
        max-height: 300px;
        display: none;
        position: absolute; /* so it stays attached to the parent */
        left: auto;
        padding: 0.5rem;
        z-index: 100231432400 !important;
        border-radius: 0.3rem;
    }

    .GraphDropdown-item {
        padding: 0.3rem 0.5rem;
    }

    .show {
        display: block !important;
    }

</style>
