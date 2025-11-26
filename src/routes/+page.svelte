<script lang="ts">
	import NowConditions from '$lib/components/home/nowConditions.svelte';
	import Alerts from '$lib/components/home/alerts.svelte';
	import Satellite from '$lib/components/satellite.svelte';
	import { weatherFuncs } from '$lib/weatherData.svelte';
	import WeeklyForecast from '$lib/components/home/weeklyForecast.svelte';
	import NowOverview from '$lib/components/home/nowOverview.svelte';
	import ForecastGraphs from '$lib/components/home/forecastGraphs.svelte';
	import { getGraph } from '$lib/graphs';
	import { user } from '$lib/userData.svelte';

    interface PageData {
        coordinates: {
            lat: number;
            lon: number;
        };
    }

    let { data } = $props<{ data: PageData }>();
</script>

<div class="flexcolumn margin2 gap3">
    <div class="wrapper padding2 flexrow-responsive gap4 space-between">
        <div class="flexcolumn gap4 hexpand" style="max-width: 600px;">
            <NowOverview></NowOverview>
            <div class="border-top"></div>
            <NowConditions></NowConditions>
            <div class="border-top"></div>
            <WeeklyForecast></WeeklyForecast>
        </div>
        <div class="flexcolumn gap1 hexpand" style="max-width: 600px;">
            {#await weatherFuncs.getCurrentWeatherAlerts()}
                Checking for alerts...
            {:then alerts}
                <Alerts alerts={alerts}></Alerts>
            {/await}
            <Satellite></Satellite>
        </div>
    </div>
    <div class="border-top"></div>
    <ForecastGraphs graph={getGraph(user.preferences.graphs.minutely_datasets)}></ForecastGraphs>
</div>