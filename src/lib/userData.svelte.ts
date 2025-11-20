interface graphs {
    hourly_datasets: string[],
    daily_datesets: string[]
}

interface forecasts {
    hourly_datasets: string[],
    daily_datesets: string[]
}

interface user {
    graphs: graphs,
    forecasts: forecasts
}

class userClass {
    graphs: graphs = $state({
        hourly_datasets: defaultHourlyValues,
        daily_datesets: defaultDailyValues
    });
    forecasts: forecasts = $state({
        hourly_datasets: defaultHourlyValues,
        daily_datesets: defaultDailyValues
    })

    public preferences: user = $derived({
        graphs: this.graphs,
        forecasts: this.forecasts
    })
}

const defaultHourlyValues = ['temperature_2m']
const defaultDailyValues = ['temperature_2m_mean', 'cloud_cover_mean']

export const user = new userClass()