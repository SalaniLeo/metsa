<script>
	import { weatherData } from "$lib/openmeteo.svelte";
	import { weatherFuncs } from "$lib/weatherData.svelte";
</script>

<div class="halign-mobile flexrow gap2 hexpand">
    <div class="flexcolumn vendalign gap2">
        <p class="secondary">Temperature</p>
        <p class="secondary">Wind speed</p>
        <p class="secondary">Wind gusts</p>
        <p class="secondary">Relative humidity</p>
        <p class="secondary">Pressure</p>
        <p class="secondary">Cloud cover</p>
    </div>
    <div class="flexcolumn gap2 vexpand">
        <div class="border-left vexpand"></div>
    </div>
    <div class="flexcolumn gap2">
        <p>{Math.round(weatherData.current.apparent_temperature * 100) / 100} °C</p>
        <p>{Math.round(weatherData.current.wind_speed_10m * 100) / 100} Km/h {weatherFuncs.degreesToDirection(weatherData.current.wind_direction_10m)}</p>
        <p>{Math.round(weatherData.current.wind_gusts_10m * 100) / 100} Km/h</p>
        <p>{weatherData.current.relative_humidity_2m} %</p>
        <p>{Math.round(weatherData.current.pressure_msl * 100) / 100} hPa</p>
        <p>{weatherData.current.cloud_cover} %</p>
    </div>
</div>


<style>
    @media screen and (max-width: 720px) {
        .halign-mobile {
            justify-content: center !important;
        }
    }
</style>