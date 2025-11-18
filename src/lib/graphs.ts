import { weatherData } from "./openmeteo"

export interface forecastGraph {
    dataset: any,
    startIndex: undefined | number,
    endIndex: undefined | number,
    startingData: String[]
}

export function getGraph(startingData: string[], dataset: string = "minutely15", startIndex: undefined | number = undefined, endIndex: undefined | number = undefined) {
    let graph: forecastGraph = { dataset: weatherData[dataset], startIndex: startIndex, endIndex: endIndex, startingData: startingData }
    return graph
}