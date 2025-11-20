<script lang="ts">
	import SatelliteImage from '$lib/components/satelliteImage.svelte';

</script>

<div class="flexcolumn padding3-responsive">
    <div class="flexcolumn gap2">
        <h1>Satellite - Eumetsat</h1>
        <div class="flexrow gap3 hexpand scroll">
            <SatelliteImage title="Fog" image="https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_RGBFog_CentralEurope.jpg"/>
            <SatelliteImage title="IR 3.9" image="https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_IR039_CentralEurope.jpg"/>
            <SatelliteImage title="IR 10.8" image="https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_IR108_CentralEurope.jpg"/>
            <SatelliteImage title="WV 6.2" image="https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_WV062_CentralEurope.jpg"/>
            <SatelliteImage title="Visible" image="https://eumetview.eumetsat.int/static-images/latestImages/EUMETSAT_MSG_VIS006_CentralEurope.jpg"/>
        </div>
    </div>

    <div class="flexcolumn gap2 hexpand margin-top3">
        <h1>Radar - 3BMeteo</h1>
        <div class="flexrow gap3 hexpand scroll">
            <SatelliteImage title="Radar" image="https://cdn4.3bmeteo.com/images/radar/VMI_animation.gif"/>
        </div>
    </div>
</div>