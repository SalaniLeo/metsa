<script lang="ts">
	import NowConditions from '$lib/components/home/nowConditions.svelte';
	import Alerts from '$lib/components/home/alerts.svelte';
	import Satellite from '$lib/components/satellite.svelte';
	import { weatherFuncs } from '$lib/weatherData.svelte';
	import WeeklyForecast from '$lib/components/home/weeklyForecast.svelte';
	import NowOverview from '$lib/components/home/nowOverview.svelte';
	import ForecastGraphs from '$lib/components/home/forecastGraphs.svelte';
	import { weatherData } from '$lib/openmeteo';
	import { getGraph, type forecastGraph } from '$lib/graphs';

    interface PageData {
        coordinates: {
            lat: number;
            lon: number;
        };
    }

    let { data } = $props<{ data: PageData }>();

    console.log(weatherData)

</script>

<div class="flexcolumn margin2 gap3">
    <div class="wrapper padding2 flexrow-responsive gap4 space-between">
        <div class="flexcolumn gap4 hexpand" style="max-width: 600px;">
            <NowOverview placeName={data.placeName}></NowOverview>
            <div class="border-top"></div>
            <NowConditions></NowConditions>
            <div class="border-top"></div>
            <WeeklyForecast></WeeklyForecast>
        </div>
        <div class="flexcolumn gap1">
            {#await weatherFuncs.getCurrentWeatherAlerts()}
                Checking for alerts...
            {:then alerts}
                <Alerts alerts={alerts}></Alerts>
            {/await}
            <Satellite></Satellite>
        </div>
    </div>
    <div class="border-top"></div>
    <!-- <ForecastGraphs dataset={weatherData.hourly} start={undefined} end={undefined} startingData={['temperature_2m']}></ForecastGraphs> -->
    <ForecastGraphs graph={getGraph(['temperature_2m', 'apparent_temperature'])}></ForecastGraphs>
</div>