<script>
	import SatelliteImage from "$lib/components/satelliteImage.svelte";

</script>

<div class="flexcolumn gap3 padding3-responsive vexpand">
    <div class="flexcolumn gap2">
        <h1>Meteociel</h1>
        <div class="flexrow gap3 hexpand scroll">
            <SatelliteImage image="https://www.meteociel.fr/obs/foudre/anim_it.gif"></SatelliteImage>
        </div>
    </div>
    <iframe class="radius-heavy" title="Blitzortung lightning map" height="100%" src="https://map.blitzortung.org/"></iframe>
</div>