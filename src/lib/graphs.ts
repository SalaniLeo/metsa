import { weatherData } from "./openmeteo.svelte"

export interface forecastGraph {
    type: string;
    dataset: typeof weatherData[keyof typeof weatherData],
    startIndex: number | undefined,
    endIndex: number | undefined,
    startingData: string[],
    fixed: boolean
}

export function getGraph(startingData: string[], dataset: keyof typeof weatherData, startIndex: number | undefined = undefined, endIndex: number | undefined = undefined, fixed: boolean = false) {
    let graph: forecastGraph = { type: dataset, dataset: weatherData[dataset], startIndex: startIndex, endIndex: endIndex, startingData: startingData, fixed: fixed }
    return graph
}