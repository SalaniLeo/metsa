<script lang="ts">
	import ForecastGraphs from "$lib/components/home/forecastGraphs.svelte";
	import { getGraph } from "$lib/graphs";
	import { weatherData } from "$lib/openmeteo.svelte";

    function generateIndex(big: any, small: any) {
    const normalizedBig = Math.min(big / 10000, 1);
    const normalizedSmall = Number(small) / 5;
    const combined = (normalizedBig + normalizedSmall) / 2;
    return Math.round(combined * 10);
    }


    function calculateStarIndex() {
        let sky_visibility = []
        
        for( let i in weatherData.hourly.time ) {
            if(Number(weatherData.hourly.cloud_cover[i]) <= 5) {
                sky_visibility.push({
                    day: String(weatherData.hourly.time[i]).slice(0, 3) + ' ' + String(weatherData.hourly.time[i]).slice(8, 10),
                    time: String(weatherData.hourly.time[i]).slice(16, 21),
                    index: generateIndex(weatherData.hourly.visibility[i], weatherData.hourly.cloud_cover[i])
                })
            }
        }

        let merged = [];
        let current_group = null;

        for (let i = 0; i < sky_visibility.length; i++) {
            const current = sky_visibility[i];
            const next = sky_visibility[i + 1];

            if (!current_group) {
                current_group = {
                    day: current.day,
                    start_time: current.time,
                    end_time: current.time,
                    index: current.index
                };
            }

            if (next && next.day === current.day) {
                const currentHour = Number(current.time.slice(0, 2));
                const nextHour = Number(next.time.slice(0, 2));
                
                if (nextHour === currentHour + 1 || (currentHour === 23 && nextHour === 0)) {
                    current_group.end_time = next.time;
                    continue;
                }
            }

            merged.push({
                day: current_group.day,
                time: current_group.start_time === current_group.end_time 
                    ? current_group.start_time 
                    : `${current_group.start_time} - ${current_group.end_time}`,
                index: current_group.index
            });

            current_group = null;
        }

        return merged;
    }

</script>

<div class="padding3 flexcolumn gap3 vexpand">
    <div class="flexrow gap2 vexpand">
        <div class="flexcolumn gap3 hexpand">
            <div class="flexcolumn gap1">
                <h2>Sky visible:</h2>
                <small class="secondary">visibility above 95%</small>
            </div>
            <div class="flexcolumn gap2">
                {#each calculateStarIndex() as time_interval}
                    <div class="flexcolumn gap1">
                        <h3>{time_interval.day}</h3>
                        <div class="flexcolumn gap1">
                            <p><span class="secondary">Time:</span> {time_interval.time}</p>
                            <p><span class="secondary">Index:</span> {time_interval.index}</p>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="flexcolumn gap2 hexpand">
                <h3>visibility graph</h3>
                <ForecastGraphs graph={getGraph(['cloud_cover', 'cloud_cover_high', 'cloud_cover_mid', 'cloud_cover_low', 'visibility'], 'hourly', undefined, undefined, true)}></ForecastGraphs>
            </div>
        </div>
    </div>
</div>