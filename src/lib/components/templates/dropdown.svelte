<script lang="ts">
	import { savePreferences } from "$lib";
	import { user } from "$lib/userData.svelte";
    let { elements, selected = $bindable() } = $props()

    let hovered = $state();

    function elementClicked(element: any) {
        selected = element
        savePreferences(user.preferences)
    }


</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dropdown wrapper radius-medium bg-tertiary min-content" onmouseenter={() => hovered = true} onmouseleave={() => hovered = false}>
    <div class="flexrow gap2 valign">
        <p class="padding2 bg-secondary radius-medium border bg-terthiary-hover">{selected}</p>
    </div>
    <div class="dropdown-body scroll border bg-secondary radius"
        class:show={hovered}>
        {#each elements as element}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <p onclick={() => {
                elementClicked(element)
            }} class="dropdown-item radius-light bg-terthiary-hover">{element}</p>
        {/each}
    </div>
</div>

<style>

    .dropdown {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .dropdown-body {
        max-height: 300px;
        display: none;
        position: absolute; /* so it stays attached to the parent */
        left: auto;
        padding: 0.5rem;
        z-index: 100231432400 !important;
        border-radius: 0.3rem;
    }

    .dropdown-item {
        padding: 0.3rem 0.5rem;
    }

    .show {
        display: block !important;
    }

</style>
