<script lang="ts">
	import { getCityName } from "$lib";
	import { coordinates, weatherData } from "$lib/openmeteo.svelte";
	import { weatherFuncs } from "$lib/weatherData.svelte";

    let weatherDescription = weatherFuncs.getWeatherDescription(weatherData.current.weather_code, weatherData.current.is_day);
</script>

<div class="flexrow hexpand">
    <div class="padding2">
        <img width="125px" src={weatherDescription.icon} alt="Weather Icon" />
    </div>
    <div>
        {#await getCityName(coordinates.lat, coordinates.lon)}
            <h1 style="font-size: 38px;" class="secondary">Loading...</h1>
        {:then placeName} 
            <h1 style="font-size: 38px;">{placeName.address.city || placeName.address.village}</h1>
        {/await}
        <div class="flexcolumn gap3">
            <div class="flexrow">
                <h2>{weatherDescription.name}</h2>
            </div>
            <div class="flexrow gap2">
            </div>
        </div>
    </div>
</div>