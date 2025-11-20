<script lang="ts">
	import AlertCard from './../templates/alertCard.svelte';
    let { alerts } = $props();

    let showAlerts = $state(false)
</script>


<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if alerts.length > 0}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="pointer bg-terthiary-hover bg-secondary border padding2 radius-medium flexrow gap2 valign" style="position: sticky; top: 1rem;" onclick={() => {showAlerts = !showAlerts}}>
        <svg width=32 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z" fill="var(--font-primary-color)"></path> </g></svg>
        <h3>There are {alerts.length} alerts</h3>
        <svg width=42 viewBox="0 0 1024 1024" fill="var(--font-primary-color)" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M642.174 504.594c7.99 7.241 7.897 17.58-0.334 24.782L332.62 799.945c-8.867 7.759-9.766 21.236-2.007 30.103 7.758 8.867 21.236 9.766 30.103 2.007l309.221-270.569c27.429-24 27.792-64.127 0.89-88.507L360.992 192.192c-8.73-7.912-22.221-7.248-30.133 1.482-7.912 8.73-7.248 22.222 1.482 30.134l309.833 280.786z" fill=""></path></g></svg>
    </div>
{/if}

<div class="alert-box flexcolumn gap2 bg-secondary padding2 border radius-heavy" class:showAlerts={showAlerts}>
    {#each alerts as alert}
        <AlertCard alertInfo={alert.alert.info[0]}></AlertCard>
    {/each}
</div>


<style>
    .showAlerts {
        transform: translateX(0%) !important;
    }
    .alert-box {
        transition-duration: 1s;
        position: fixed;
        top: 5rem;
        right: calc(1rem + 8px);
        transform: translateX(calc(100% + 1rem));
    }
</style>