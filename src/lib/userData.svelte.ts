import { browser } from "$app/environment"

interface graphs {
    minutely_datasets: string[],
    hourly_datasets: string[],
    daily_datasets: string[]
}

interface forecasts {
    hourly_datasets: string[],
    daily_datasets: string[]
}

interface user {
    graphs: graphs,
    forecasts: forecasts
}

class userClass {

    public preferences: user = $state(
        (() => {
            if (!browser) return {
                graphs: {
                    minutely_datasets: defaultMinutelyValues,
                    hourly_datasets: defaultHourlyValues,
                    daily_datasets: defaultDailyValues
                },
                forecasts: {
                    hourly_datasets: defaultHourlyValues,
                    daily_datasets: defaultDailyValues
                }
            };
            const item = localStorage.getItem('preferences');
            return item ? JSON.parse(item) : {
                graphs: {
                    minutely_datasets: defaultMinutelyValues,
                    hourly_datasets: defaultHourlyValues,
                    daily_datasets: defaultDailyValues
                },
                forecasts: {
                    hourly_datasets: defaultHourlyValues,
                    daily_datasets: defaultDailyValues
                }
            };
        })()
    )
}

const defaultMinutelyValues = ['temperature_2m']
const defaultHourlyValues = ['temperature_2m']
const defaultDailyValues = ['temperature_2m_mean', 'cloud_cover_mean']

export const user = new userClass()