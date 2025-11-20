<script lang="ts">
	import ForecastGraphs from './forecastGraphs.svelte';
	import { roundNumber, weekday } from "$lib";
	import { weatherData } from "$lib/openmeteo.svelte";
	import { weatherFuncs } from "$lib/weatherData.svelte";
	import { writable } from "svelte/store";
	import DayCard from "../templates/dayCard.svelte";
	import DayModal from "../templates/modals/dayModal.svelte";
	import { getGraph } from '$lib/graphs';
	import { user } from '$lib/userData.svelte';

    interface dayJson {
        dayIcon: string,
        dayDescription: string,
        hoursIndexes: {
            start: number,
            end: number
        },
        dayValues: any,
        selectedHour: number | undefined
    }

    let showModal = $state(false);
    let showMoreIndex = writable(0)
    const d = new Date();

    let day = $state(<dayJson>{})

    showMoreIndex.subscribe((dayIndex) => {
        const code = weatherData?.daily?.weather_code?.[dayIndex] ?? 0;
        let dayOverview = weatherFuncs.getWeatherDescription(code, 1)
        let dayStart =  24 * dayIndex
        let dayEnd = 24 * (dayIndex + 1)
        let dayValues: any = {};
            dayValues.hourly_units = weatherData.hourly_units

        const hourly = (weatherData.hourly as unknown) as { [k: string]: any };
        (Object.keys(hourly) as Array<keyof typeof hourly>).forEach((key) => {
            const values = hourly[key];
            const arr = Array.isArray(values) ? values : Array.from(values as any);
            dayValues[key] = arr.slice(dayStart, dayEnd)
        })

        day = {
            dayIcon: dayOverview.icon,
            dayDescription: dayOverview.name,
            hoursIndexes: {
                start: dayStart,
                end: dayEnd
            },
            dayValues: dayValues,
            selectedHour: undefined
        }
    })

</script>

{#each { length: 7 }, day}
    <DayCard day={day} bind:showMore={showModal} bind:clickedDay={showMoreIndex} ></DayCard>
{/each}

<DayModal bind:showModal={showModal}>
    {#snippet header()}
        <h2>
            {weekday[(d.getDay() + $showMoreIndex) % 7]}
        </h2>
    {/snippet}

        <div class="flexcolumn padding2 gap4">
            <div class="flexrow">
                <div class="flexrow gap3">
                    <img width="82" src="{day.dayIcon}" alt="">
                    <div class="flexcolumn gap2">
                        <h2>{day.dayDescription}</h2>
                        <div class="valign">
                            <svg width=18 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="var(--font-primary-color)"></path> </g></svg>
                            <p>{roundNumber(Math.max(...day.dayValues.temperature_2m))} °C</p>
                        </div>    
                        <div class="valign">
                            <svg width=18 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="var(--font-primary-color)"></path> </g></svg>
                            <p>{roundNumber(Math.min(...day.dayValues.temperature_2m))} °C</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flexcolumn">
                <h3 class="secondary">Select an hour for details...</h3>
                <div class="flexrow gap2 scroll">
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                     {#each day.dayValues.time as time, i}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <div class="flexcolumn gap2 halign valign bg-secondary bg-terthiary-hover border radius-medium padding2 pointer" style="min-width: max-content;" onclick={() => {day.selectedHour = i}}>
                            {#if weatherData.hourly.weather_code && weatherData.hourly.is_day}
                                <img width="32" src="{weatherFuncs.getWeatherDescription(weatherData.hourly.weather_code[day.hoursIndexes.start + i], weatherData.hourly.is_day[day.hoursIndexes.start + i]).icon}" alt="">
                            {/if}
                            <h3>{weatherFuncs.convertTimestamp(time, day.dayValues.time)}</h3>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="flexcolumn gap3">
                <div class="flexrow gap2">
                    <div class="flexcolumn gap2">
                        {#if day.selectedHour === undefined}
                            <h3>Day overview</h3>
                            <div class="flexrow gap2">
                                <div class="flexcolumn">
                                    {#each user.preferences.forecasts.daily_datesets as dataset}
                                        <p class="secondary">{dataset}</p>
                                    {/each}
                                </div>
                                <div class="border-left"></div>
                                <div class="flexcolumn">
                                    {#each user.preferences.forecasts.daily_datesets as dataset}
                                        <p>{typeof (weatherData.daily as any)[dataset][$showMoreIndex] === "number" ? roundNumber((weatherData.daily as any)[dataset][$showMoreIndex]) : (weatherData.daily as any)[dataset][$showMoreIndex]} {(weatherData.daily_units as any)[dataset]}</p>
                                    {/each}
                                    </div>
                            </div>
                        {:else if typeof(day.selectedHour) === "number"}
                            <h3>Hour overview, time: {weatherFuncs.convertTimestamp(day.dayValues.time[day.selectedHour], day.dayValues.time)}</h3>
                            <div class="flexrow gap2">
                                <div class="flexcolumn">
                                    {#each user.preferences.forecasts.hourly_datasets as dataset}
                                        <p class="secondary">{dataset}</p>
                                    {/each}
                                </div>
                                <div class="border-left"></div>
                                <div class="flexcolumn">
                                    {#each user.preferences.forecasts.hourly_datasets as dataset}
                                        <p>{typeof day.dayValues[dataset][day.selectedHour] === "number" ? roundNumber(day.dayValues[dataset][day.selectedHour]) : day.dayValues[dataset][day.selectedHour]} {(weatherData.hourly_units as any)[dataset]}</p>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
                <ForecastGraphs graph={getGraph(user.preferences.graphs.hourly_datasets, "hourly", day.hoursIndexes.start, day.hoursIndexes.end)}></ForecastGraphs>
            </div>
        </div>

</DayModal>