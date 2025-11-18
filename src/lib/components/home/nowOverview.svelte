<script lang="ts">
	import { weatherData } from "$lib/openmeteo";
	import { weatherFuncs } from "$lib/weatherData.svelte";

    let { placeName } = $props();
    let weatherDescription = weatherFuncs.getWeatherDescription(weatherData.current.weather_code, weatherData.current.is_day);
</script>

<div class="flexrow hexpand">
    <div class="padding2">
        <img width="150px" src={weatherDescription.icon} alt="Weather Icon" />
    </div>
    <div>
        <h1 style="font-size: 46px;">{placeName}</h1>
        <div class="flexcolumn gap3">
            <div class="flexrow">
                <h1>{weatherDescription.name}</h1>
            </div>
            <div class="flexrow gap2">
            </div>
        </div>
    </div>
</div>