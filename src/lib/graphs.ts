import { weatherData } from "./openmeteo.svelte"

export interface forecastGraph {
    type: string;
    dataset: typeof weatherData[keyof typeof weatherData],
    startIndex: number | undefined,
    endIndex: number | undefined,
    startingData: string[]
}

export function getGraph(startingData: string[], dataset: keyof typeof weatherData = "minutely15", startIndex: number | undefined = undefined, endIndex: number | undefined = undefined) {
    let graph: forecastGraph = { type: dataset, dataset: weatherData[dataset], startIndex: startIndex, endIndex: endIndex, startingData: startingData }
    return graph
}