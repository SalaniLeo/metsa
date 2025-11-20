<script lang="ts">
	import { weekday } from "$lib";
	import { weatherData } from "$lib/openmeteo.svelte";
	import { weatherFuncs } from "$lib/weatherData.svelte";


    let { day, showMore = $bindable(), clickedDay = $bindable() } = $props()

    const d = new Date();

    let dayDescriptions = []

    for(let i = 0; i < 7; i++) {
        dayDescriptions.push(weatherFuncs.getWeatherDescription(weatherData.daily?.weather_code?.[i] ?? 0, 1))
    }

</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="day pointer bg-secondary border padding2 radius-medium flexrow gap2 space-between" onclick={() => {showMore = true; clickedDay.set(day)}}>
    <div class="flexrow gap2">
        <img width="24" src="{dayDescriptions[day].icon}" alt="">
        <p>{weekday[(d.getDay() + day) % 7]}</p>
    </div>
    <div class="flexrow gap2">
        <div class="flexrow space-between gap2">
            <div class="valign halign">
                <svg class="small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="var(--font-primary-color)"></path> </g></svg>
                <p class="small">{weatherFuncs.formatTemperature(weatherData.daily?.temperature_2m_max?.[day] ?? null)} °C</p>
            </div>    
            <div class="valign halign">
                <svg class="small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="var(--font-primary-color)"></path> </g></svg>
                <p class="small">{weatherFuncs.formatTemperature(weatherData.daily?.temperature_2m_min?.[day] ?? null)} °C</p>
            </div>
        </div>
        <div class="more valign">
            <svg viewBox="0 0 1024 1024" fill="var(--font-primary-color)" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M642.174 504.594c7.99 7.241 7.897 17.58-0.334 24.782L332.62 799.945c-8.867 7.759-9.766 21.236-2.007 30.103 7.758 8.867 21.236 9.766 30.103 2.007l309.221-270.569c27.429-24 27.792-64.127 0.89-88.507L360.992 192.192c-8.73-7.912-22.221-7.248-30.133 1.482-7.912 8.73-7.248 22.222 1.482 30.134l309.833 280.786z" fill=""></path></g></svg>
        </div>
    </div>
</div>

<style>
    .day:hover {
        background-color: var(--terthiary-color);
    }

    svg {
        width: 24px
    }

    @media screen and (max-width: 720px) {
        
        .small {
            font-size: 12px !important;
        }
    }
</style>