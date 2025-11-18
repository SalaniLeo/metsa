<script>
	import { weatherData } from "$lib/openmeteo";
	import { weatherFuncs } from "$lib/weatherData.svelte";
</script>

<div class="flexrow gap2">
    <div class="flexcolumn vendalign gap2">
        <p>Temperature</p>
        <p>Wind speed</p>
        <p>Wind gusts</p>
        <p>Relative humidity</p>
        <p>Pressure</p>
        <p>Cloud cover</p>
    </div>
    <div class="flexcolumn gap2">
        <p>|</p>
        <p>|</p>
        <p>|</p>
        <p>|</p>
        <p>|</p>
        <p>|</p>
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