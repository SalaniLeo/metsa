import { browser } from "$app/environment";

export const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export function roundNumber(number: number) {
    return Math.round(number * 100) / 100
}

export async function getCityName(lat: number, lon: number) {
    const request = await fetch('/city_name', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({lat: lat,lon: lon})})
    return await request.json()
}

export function savePreferences(data: any) {
    if(browser) {
        localStorage.setItem('preferences', JSON.stringify(data))
    }
}