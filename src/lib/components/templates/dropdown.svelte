<script lang="ts">
    let { title, elements, selected = $bindable() } = $props()

    // console.log(elements)

    let hovered = $state();

    let filteredElements = $state(elements.filter((item: any) => !selected.includes(item)))

    function elementClicked(element: any) {
        selected.includes(element) ? selected = selected.filter((el: any) => el !== element) : selected.push(element)
    }

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="dropdown wrapper radius-medium bg-tertiary"
    onmouseenter={() => hovered = true}
    onmouseleave={() => hovered = false}
>
    <p class="padding2 bg-terthiary radius-medium border">{title}</p>

    <div class="dropdown-body border bg-secondary radius" class:show={hovered}>
        {#each filteredElements as element}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <p onclick={() => {
                elementClicked(element)
            }} class="dropdown-item radius-light">{element}</p>
        {/each}
    </div>
</div>

<style>
    .dropdown {
        z-index: 0;
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .dropdown-body {
        display: none;
        position: absolute; /* so it stays attached to the parent */
        top: 100%;
        left: 0;
        padding: 0.5rem;
        z-index: 10;
        border-radius: 0.3rem;
    }

    .dropdown-item {
        padding: 0.3rem 0.5rem;
    }

    .dropdown-item:hover {
        background: var(--accent-color-primary);
    }

    .show {
        display: block !important;
    }
</style>
