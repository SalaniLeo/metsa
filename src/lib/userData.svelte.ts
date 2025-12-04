import { browser } from "$app/environment"

interface graphs {
    minutely15: string[],
    hourly: string[],
    daily: string[]
}

interface forecasts {
    hourly: string[],
    daily: string[]
}

interface home {
    graph: string 
}

interface user {
    graphs: graphs,
    forecasts: forecasts,
    home: home
}

class userClass {

    public preferences: user = $state(
        (() => {
            if (!browser) return {
                graphs: {
                    minutely15: defaultMinutelyValues,
                    hourly: defaultHourlyValues,
                    daily: defaultDailyValues
                },
                forecasts: {
                    hourly: defaultHourlyValues,
                    daily: defaultDailyValues
                },
                home: {
                    graph: defaultHomeGraph
                }
            };
            const item = localStorage.getItem('preferences');
            return item ? JSON.parse(item) : {
                graphs: {
                    minutely15: defaultMinutelyValues,
                    hourly: defaultHourlyValues,
                    daily: defaultDailyValues
                },
                forecasts: {
                    hourly: defaultHourlyValues,
                    daily: defaultDailyValues
                },
                home: {
                    graph: defaultHomeGraph
                }
            };
        })()
    )
}

const defaultHomeGraph = 'minutely15'
const defaultMinutelyValues = ['temperature_2m']
const defaultHourlyValues = ['temperature_2m']
const defaultDailyValues = ['temperature_2m_mean', 'cloud_cover_mean']

export const user = new userClass()