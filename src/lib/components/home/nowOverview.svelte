<script lang="ts">
	import { getCityName } from "$lib";
	import { coordinates, weatherData } from "$lib/openmeteo.svelte";
	import { weatherFuncs } from "$lib/weatherData.svelte";

    let weatherDescription = weatherFuncs.getWeatherDescription(weatherData.current.weather_code, weatherData.current.is_day);
</script>

<div class="flexrow hexpand">
    <div class="padding2">
        <img width="150px" src={weatherDescription.icon} alt="Weather Icon" />
    </div>
    <div>
        {#await getCityName(coordinates.lat, coordinates.lon)}
            <h1 style="font-size: 46px;" class="secondary">Loading...</h1>
        {:then placeName} 
            {console.log(placeName)}
            <h1 style="font-size: 46px;">{placeName.address.city || placeName.address.village}</h1>
        {/await}
        <div class="flexcolumn gap3">
            <div class="flexrow">
                <h1>{weatherDescription.name}</h1>
            </div>
            <div class="flexrow gap2">
            </div>
        </div>
    </div>
</div>