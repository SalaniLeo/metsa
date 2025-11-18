<script lang="ts">
    let { alertInfo } = $props();
    let mouseEnter = $state(false)
    let showDetails = $state(false);

    let severityClass = alertInfo.severity.toLowerCase();


</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onmouseenter={() => {mouseEnter = true}} onmouseleave={() => {mouseEnter = false}} class="{severityClass} alert-card radius-medium padding3 margin-bottom2 flexcolumn gap2 border">
    <div class="flexrow space-between valign gap3 hexpand">
        <h3>{alertInfo.event}</h3>
        <small>{alertInfo.severity}</small>
    </div>

    {#if showDetails}
        <p>{alertInfo.description}</p>
    {/if}

    <div class="hexpand valign halign">
        <button class:show={mouseEnter} onclick={() => {showDetails = !showDetails}} class="transparent hide">
            {#if showDetails}
                <svg width=24 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="var(--font-primary-color)"></path> </g></svg>
            {:else}
                <svg width=24 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="var(--font-primary-color)"></path> </g></svg>
            {/if}
        </button>
    </div>

</div> 


<style>
    .hide {
        display: none;
    }
    .show {
        display: flex;
    }
    .alert-card {
        transition-duration: 0.5s;
        max-width: 450px;
    }
    .moderate {
        background-color: var(--font-warning-color);
        border: 2px solid var(--font-warning-color) !important;
    }
</style>