<script lang="ts">
	import ForecastGraphs from './forecastGraphs.svelte';
	import { roundNumber, weekday } from "$lib";
	import { weatherData } from "$lib/openmeteo";
	import { weatherFuncs } from "$lib/weatherData.svelte";
	import { writable } from "svelte/store";
	import DayCard from "../templates/dayCard.svelte";
	import DayModal from "../templates/modals/dayModal.svelte";
	import { getGraph } from '$lib/graphs';

    interface dayValues {
        temperature: {
            max: number,
            min: number,
            hourly: []
        },
        pressure: [],
    }

    interface dayJson {
        dayIcon: string,
        dayDescription: string,
        hoursIndexes: {
            start: number,
            end: number
        },
        dayValues: {}
    }

    let showModal = $state(false);
    let showMoreIndex = writable(0)
    const d = new Date();

    let day = $state(<dayJson>{})

    showMoreIndex.subscribe((dayIndex) => {
        let dayOverview = weatherFuncs.getWeatherDescription(weatherData.daily.weather_code[$showMoreIndex], 1)
        let dayStart =  24 * dayIndex
        let dayEnd = 24 * (dayIndex + 1)
        let dayValues = <dayValues>{
        temperature: {max: 0, min: 0, hourly: []},
        pressure: []
        }

        dayValues.temperature.max = roundNumber(weatherData.daily.temperature_2m_max[dayIndex])
        dayValues.temperature.min = roundNumber(weatherData.daily.temperature_2m_min[dayIndex])

        for(let i = dayStart; i < dayEnd; i++) {
            dayValues.temperature.hourly.push(roundNumber(weatherData.hourly.temperature_2m[i]))
        }

        day = {
            dayIcon: dayOverview.icon,
            dayDescription: dayOverview.name,
            hoursIndexes: {
                start: dayStart,
                end: dayEnd
            },
            dayValues
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
                            <p>{day.dayValues.temperature.max} °C</p>
                        </div>    
                        <div class="valign">
                            <svg width=18 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="var(--font-primary-color)"></path> </g></svg>
                            <p>{day.dayValues.temperature.min} °C</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flexcolumn">
                <div class="flexrow">
                    <ForecastGraphs graph={getGraph(['temperature_2m'], "hourly", day.hoursIndexes.start, day.hoursIndexes.end)}></ForecastGraphs>
                </div>
            </div>
        </div>

</DayModal>