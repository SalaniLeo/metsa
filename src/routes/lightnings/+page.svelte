<script>
	import ForecastGraphs from "$lib/components/home/forecastGraphs.svelte";
	import SatelliteImage from "$lib/components/satelliteImage.svelte";
	import { getGraph } from "$lib/graphs";

</script>

<div class="flexcolumn gap3 padding3-responsive vexpand">
    <div class="flexrow-responsive hexpand vexpand gap2">
        <div class="iframe-container hexpand">
            <iframe width="99%" height="99%" class="radius-heavy" title="Blitzortung lightning map" src="https://map.blitzortung.org/"></iframe>
        </div>
        <div>
            <SatelliteImage image="https://www.meteociel.fr/obs/foudre/anim_it.gif" title={"Meteociel"}></SatelliteImage>
        </div>
    </div>
    <div class="flexcolumn gap2">
        <div class="flexcolumn">
            <h2>lightning potential</h2>
            <small class="secondary">Next 6 hours, 15 minutes intervals</small>
        </div>
        <ForecastGraphs graph={getGraph(['lightning_potential'], 'minutely15', 0, 25, true)}></ForecastGraphs>
    </div>
</div>

<style>
    iframe, .iframe-container {
        max-width: 1440px;
        min-height: 50vh !important;
    }
</style>