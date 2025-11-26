<script lang="ts">
	import Dropdown from '$lib/components/templates/dropdown.svelte';
	import { coordinates } from '$lib/openmeteo.svelte';
	import { user } from '$lib/userData.svelte';

    let insertedLat = $state(coordinates.lat)
    let insertedLon = $state(coordinates.lon)
    let insertedCity = $state()

    function saveCoordinates(lat: number, lon: number) {
        coordinates.setWeatherCoordinates({lat, lon})
    }

</script>

<div class="flexcolumn padding3-responsive gap4">
    <h1 class="min-content border-bottom">Settings</h1>
    <div class="flexcolumn gap4">
        <div class="flexrow-responsive gap4">
            <div class="flexcolumn gap3">
                <h2>Position</h2>
                <div class="flexrow gap2">
                    <div class="flexcolumn gap2">
                        <p class="vexpand valign">Latitude</p>
                        <p class="vexpand valign">Longiture</p>
                    </div>
                    <div class="flexcolumn gap2">
                        <input type="text" name="lat" id="lat" bind:value={insertedLat}>
                        <input type="text" name="lon" id="lon" bind:value={insertedLon}>
                    </div>
                </div>
                <button class="border" onclick={() => {saveCoordinates(Number(insertedLat), Number(insertedLon))}}>Save</button>
            </div>
        </div>
        <div class="border-bottom"></div>
        <div class="flexrow-responsive gap5">
            <div class="flexcolumn gap3">
                <h2>Graphs</h2>
                <div class="flexcolumn gap2">
                    <div class="flexcolumn gap3">
                        {#each Object.keys(user.preferences.graphs) as graphPreference}
                        <!-- {console.log(graphPreference)} -->
                        <div class="flexcolumn gap2">
                            <h3>{String(graphPreference).replace("_", " ")}</h3>
                                <div class="flexcolumn gap2">
                                    <Dropdown type={graphPreference} title={"Select data"} bind:selected={user.preferences.graphs[graphPreference as keyof typeof user.preferences.graphs]}></Dropdown>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="flexcolumn gap3">
                <h2>Forecasts</h2>
                <div class="flexcolumn gap2">
                    <div class="flexcolumn gap3">
                        {#each Object.keys(user.preferences.forecasts) as forecastsPreference}
                        <div class="flexcolumn gap2">
                            <h3>{String(forecastsPreference).replace("_", " ")}</h3>
                                <div class="flexcolumn gap2">
                                    <Dropdown type={forecastsPreference} title={"Select data"} bind:selected={user.preferences.forecasts[forecastsPreference as keyof typeof user.preferences.forecasts]}></Dropdown>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>