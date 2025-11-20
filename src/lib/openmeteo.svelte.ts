import { fetchWeatherApi } from "openmeteo";
import { browser } from "$app/environment";
import type { coordinates as coordinatesInterface } from "./components/templates/interfaces";
import { invalidateAll } from "$app/navigation";
import { getCityName } from "$lib";

class coordinatesClass {

	lat = $state(browser && localStorage.getItem('coordinates') !== null ? JSON.parse(localStorage.getItem('coordinates') ?? '44.82').lat : 44.82)
	lon = $state(browser && localStorage.getItem('coordinates') !== null ? JSON.parse(localStorage.getItem('coordinates') ?? '11.63').lon : 11.63)
	city_name = $state()

	async getCityName() {
		if(this.city_name) {
			return this.city_name
		} else {
			this.city_name = await getCityName(this.lat, this.lon)
			return this.city_name
		}
	}

	getWeatherCoordinates() {
		return { lat: this.lat, lon: this.lon }
	}

	setWeatherCoordinates(coordinates: coordinatesInterface) {
		this.lat = coordinates.lat
		this.lon = coordinates.lon

		if(browser) {
			localStorage.setItem('coordinates', JSON.stringify({ lat: this.lat, lon: this.lon }))
		}

		invalidateAll()

	}
}

export let coordinates: coordinatesClass = new coordinatesClass()

const params = $derived({
	latitude: coordinates.lat,
	longitude: coordinates.lon,
	daily: ["weather_code", "temperature_2m_max", "apparent_temperature_max", "apparent_temperature_min", "temperature_2m_min", "uv_index_clear_sky_max", "uv_index_max", "sunshine_duration", "daylight_duration", "sunrise", "sunset", "showers_sum", "rain_sum", "snowfall_sum", "precipitation_sum", "precipitation_probability_max", "precipitation_hours", "et0_fao_evapotranspiration", "shortwave_radiation_sum", "wind_direction_10m_dominant", "wind_gusts_10m_max", "wind_speed_10m_max", "temperature_2m_mean", "apparent_temperature_mean", "cape_mean", "cape_max", "cape_min", "cloud_cover_mean", "cloud_cover_min", "cloud_cover_max", "dew_point_2m_mean", "dew_point_2m_max", "dew_point_2m_min", "pressure_msl_min", "pressure_msl_max", "pressure_msl_mean", "snowfall_water_equivalent_sum", "relative_humidity_2m_max", "relative_humidity_2m_min", "relative_humidity_2m_mean", "precipitation_probability_min", "precipitation_probability_mean", "leaf_wetness_probability_mean", "growing_degree_days_base_0_limit_50", "et0_fao_evapotranspiration_sum", "surface_pressure_mean", "surface_pressure_max", "updraft_max", "surface_pressure_min", "visibility_mean", "visibility_min", "visibility_max", "winddirection_10m_dominant", "wind_gusts_10m_mean", "wind_speed_10m_mean", "wind_gusts_10m_min", "wind_speed_10m_min", "vapour_pressure_deficit_max", "wet_bulb_temperature_2m_min", "wet_bulb_temperature_2m_max", "wet_bulb_temperature_2m_mean"],
	hourly: ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "vapour_pressure_deficit", "evapotranspiration", "et0_fao_evapotranspiration", "visibility", "cloud_cover_high", "cloud_cover_mid", "cloud_cover_low", "cloud_cover", "surface_pressure", "pressure_msl", "weather_code", "wind_speed_10m", "wind_speed_80m", "wind_speed_120m", "wind_speed_180m", "wind_direction_10m", "wind_direction_80m", "wind_direction_120m", "wind_gusts_10m", "wind_direction_180m", "temperature_80m", "temperature_180m", "temperature_120m", "soil_moisture_27_to_81cm", "soil_moisture_9_to_27cm", "soil_moisture_3_to_9cm", "soil_moisture_1_to_3cm", "soil_moisture_0_to_1cm", "soil_temperature_54cm", "soil_temperature_18cm", "soil_temperature_6cm", "soil_temperature_0cm", "uv_index", "uv_index_clear_sky", "is_day", "sunshine_duration", "total_column_integrated_water_vapour", "wet_bulb_temperature_2m", "boundary_layer_height", "freezing_level_height", "convective_inhibition", "lifted_index", "cape", "shortwave_radiation", "direct_radiation", "direct_normal_irradiance", "global_tilted_irradiance", "diffuse_radiation", "terrestrial_radiation_instant", "global_tilted_irradiance_instant", "direct_normal_irradiance_instant", "diffuse_radiation_instant", "direct_radiation_instant", "shortwave_radiation_instant", "terrestrial_radiation"],
	models: "best_match",
	current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "snowfall", "wind_gusts_10m", "wind_direction_10m", "wind_speed_10m", "weather_code", "cloud_cover", "pressure_msl", "surface_pressure", "rain", "showers", "precipitation"],
	minutely_15: ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation", "shortwave_radiation", "direct_radiation", "diffuse_radiation", "global_tilted_irradiance", "direct_normal_irradiance", "terrestrial_radiation", "terrestrial_radiation_instant", "global_tilted_irradiance_instant", "direct_normal_irradiance_instant", "shortwave_radiation_instant", "diffuse_radiation_instant", "direct_radiation_instant", "sunshine_duration", "freezing_level_height", "snowfall_height", "rain", "snowfall", "weather_code", "wind_speed_10m", "wind_speed_80m", "wind_direction_10m", "wind_direction_80m", "is_day", "lightning_potential", "cape", "visibility", "wind_gusts_10m"],
})

const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const current = response.current()!;
const minutely15 = response.minutely15()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Define Int64 variables so they can be processed accordingly
const sunrise = daily.variables(9)!;
const sunset = daily.variables(10)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
export const weatherData = {
	current_units: {
		time: "iso8601",
		interval: "seconds",
		temperature_2m: "°C",
		relative_humidity_2m: "%",
		apparent_temperature: "°C",
		is_day: "",
		snowfall: "cm",
		wind_gusts_10m: "km/h",
		wind_direction_10m: "°",
		wind_speed_10m: "km/h",
		weather_code: "wmo code",
		cloud_cover: "%",
		pressure_msl: "hPa",
		surface_pressure: "hPa",
		rain: "mm",
		showers: "mm",
		precipitation: "mm"
	},
	minutely_15_units: {
		time: "iso8601",
		temperature_2m: "°C",
		relative_humidity_2m: "%",
		dew_point_2m: "°C",
		apparent_temperature: "°C",
		precipitation: "mm",
		shortwave_radiation: "W/m²",
		direct_radiation: "W/m²",
		diffuse_radiation: "W/m²",
		global_tilted_irradiance: "W/m²",
		direct_normal_irradiance: "W/m²",
		terrestrial_radiation: "W/m²",
		terrestrial_radiation_instant: "W/m²",
		global_tilted_irradiance_instant: "W/m²",
		direct_normal_irradiance_instant: "W/m²",
		shortwave_radiation_instant: "W/m²",
		diffuse_radiation_instant: "W/m²",
		direct_radiation_instant: "W/m²",
		sunshine_duration: "s",
		freezing_level_height: "m",
		snowfall_height: "m",
		rain: "mm",
		snowfall: "cm",
		weather_code: "wmo code",
		wind_speed_10m: "km/h",
		wind_speed_80m: "km/h",
		wind_direction_10m: "°",
		wind_direction_80m: "°",
		is_day: "",
		lightning_potential: "J/kg",
		cape: "J/kg",
		visibility: "m",
		wind_gusts_10m: "km/h"
	},
	hourly_units: {
		time: "iso8601",
		temperature_2m: "°C",
		relative_humidity_2m: "%",
		dew_point_2m: "°C",
		apparent_temperature: "°C",
		precipitation_probability: "%",
		precipitation: "mm",
		rain: "mm",
		showers: "mm",
		snowfall: "cm",
		snow_depth: "m",
		vapour_pressure_deficit: "kPa",
		evapotranspiration: "mm",
		et0_fao_evapotranspiration: "mm",
		visibility: "m",
		cloud_cover_high: "%",
		cloud_cover_mid: "%",
		cloud_cover_low: "%",
		cloud_cover: "%",
		surface_pressure: "hPa",
		pressure_msl: "hPa",
		weather_code: "wmo code",
		wind_speed_10m: "km/h",
		wind_speed_80m: "km/h",
		wind_speed_120m: "km/h",
		wind_speed_180m: "km/h",
		wind_direction_10m: "°",
		wind_direction_80m: "°",
		wind_direction_120m: "°",
		wind_gusts_10m: "km/h",
		wind_direction_180m: "°",
		temperature_80m: "°C",
		temperature_180m: "°C",
		temperature_120m: "°C",
		soil_moisture_27_to_81cm: "m³/m³",
		soil_moisture_9_to_27cm: "m³/m³",
		soil_moisture_3_to_9cm: "m³/m³",
		soil_moisture_1_to_3cm: "m³/m³",
		soil_moisture_0_to_1cm: "m³/m³",
		soil_temperature_54cm: "°C",
		soil_temperature_18cm: "°C",
		soil_temperature_6cm: "°C",
		soil_temperature_0cm: "°C",
		uv_index: "",
		uv_index_clear_sky: "",
		is_day: "",
		sunshine_duration: "s",
		total_column_integrated_water_vapour: "kg/m²",
		wet_bulb_temperature_2m: "°C",
		boundary_layer_height: "m",
		freezing_level_height: "m",
		convective_inhibition: "J/kg",
		lifted_index: "",
		cape: "J/kg",
		shortwave_radiation: "W/m²",
		direct_radiation: "W/m²",
		direct_normal_irradiance: "W/m²",
		global_tilted_irradiance: "W/m²",
		diffuse_radiation: "W/m²",
		terrestrial_radiation_instant: "W/m²",
		global_tilted_irradiance_instant: "W/m²",
		direct_normal_irradiance_instant: "W/m²",
		diffuse_radiation_instant: "W/m²",
		direct_radiation_instant: "W/m²",
		shortwave_radiation_instant: "W/m²",
		terrestrial_radiation: "W/m²"
	},
	daily_units: {
		time: "iso8601",
		weather_code: "wmo code",
		temperature_2m_max: "°C",
		apparent_temperature_max: "°C",
		apparent_temperature_min: "°C",
		temperature_2m_min: "°C",
		uv_index_clear_sky_max: "",
		uv_index_max: "",
		sunshine_duration: "s",
		daylight_duration: "s",
		sunrise: "iso8601",
		sunset: "iso8601",
		showers_sum: "mm",
		rain_sum: "mm",
		snowfall_sum: "cm",
		precipitation_sum: "mm",
		precipitation_probability_max: "%",
		precipitation_hours: "h",
		et0_fao_evapotranspiration: "mm",
		shortwave_radiation_sum: "MJ/m²",
		wind_direction_10m_dominant: "°",
		wind_gusts_10m_max: "km/h",
		wind_speed_10m_max: "km/h",
		temperature_2m_mean: "°C",
		apparent_temperature_mean: "°C",
		cape_mean: "J/kg",
		cape_max: "J/kg",
		cape_min: "J/kg",
		cloud_cover_mean: "%",
		cloud_cover_min: "%",
		cloud_cover_max: "%",
		dew_point_2m_mean: "°C",
		dew_point_2m_max: "°C",
		dew_point_2m_min: "°C",
		pressure_msl_min: "hPa",
		pressure_msl_max: "hPa",
		pressure_msl_mean: "hPa",
		snowfall_water_equivalent_sum: "mm",
		relative_humidity_2m_max: "%",
		relative_humidity_2m_min: "%",
		relative_humidity_2m_mean: "%",
		precipitation_probability_min: "%",
		precipitation_probability_mean: "%",
		leaf_wetness_probability_mean: "undefined",
		growing_degree_days_base_0_limit_50: "undefined",
		et0_fao_evapotranspiration_sum: "mm",
		surface_pressure_mean: "hPa",
		surface_pressure_max: "hPa",
		updraft_max: "m/s",
		surface_pressure_min: "hPa",
		visibility_mean: "m",
		visibility_min: "m",
		visibility_max: "m",
		winddirection_10m_dominant: "°",
		wind_gusts_10m_mean: "km/h",
		wind_speed_10m_mean: "km/h",
		wind_gusts_10m_min: "km/h",
		wind_speed_10m_min: "km/h",
		vapour_pressure_deficit_max: "kPa",
		wet_bulb_temperature_2m_min: "°C",
		wet_bulb_temperature_2m_max: "°C",
		wet_bulb_temperature_2m_mean: "°C"
	},
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature_2m: current.variables(0)!.value(),
		relative_humidity_2m: current.variables(1)!.value(),
		apparent_temperature: current.variables(2)!.value(),
		is_day: current.variables(3)!.value(),
		snowfall: current.variables(4)!.value(),
		wind_gusts_10m: current.variables(5)!.value(),
		wind_direction_10m: current.variables(6)!.value(),
		wind_speed_10m: current.variables(7)!.value(),
		weather_code: current.variables(8)!.value(),
		cloud_cover: current.variables(9)!.value(),
		pressure_msl: current.variables(10)!.value(),
		surface_pressure: current.variables(11)!.value(),
		rain: current.variables(12)!.value(),
		showers: current.variables(13)!.value(),
		precipitation: current.variables(14)!.value(),
	},
	minutely15: {
		time: Array.from(
			{ length: (Number(minutely15.timeEnd()) - Number(minutely15.time())) / minutely15.interval() }, 
			(_, i) => new Date((Number(minutely15.time()) + i * minutely15.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: minutely15.variables(0)!.valuesArray(),
		relative_humidity_2m: minutely15.variables(1)!.valuesArray(),
		dew_point_2m: minutely15.variables(2)!.valuesArray(),
		apparent_temperature: minutely15.variables(3)!.valuesArray(),
		precipitation: minutely15.variables(4)!.valuesArray(),
		shortwave_radiation: minutely15.variables(5)!.valuesArray(),
		direct_radiation: minutely15.variables(6)!.valuesArray(),
		diffuse_radiation: minutely15.variables(7)!.valuesArray(),
		global_tilted_irradiance: minutely15.variables(8)!.valuesArray(),
		direct_normal_irradiance: minutely15.variables(9)!.valuesArray(),
		terrestrial_radiation: minutely15.variables(10)!.valuesArray(),
		terrestrial_radiation_instant: minutely15.variables(11)!.valuesArray(),
		global_tilted_irradiance_instant: minutely15.variables(12)!.valuesArray(),
		direct_normal_irradiance_instant: minutely15.variables(13)!.valuesArray(),
		shortwave_radiation_instant: minutely15.variables(14)!.valuesArray(),
		diffuse_radiation_instant: minutely15.variables(15)!.valuesArray(),
		direct_radiation_instant: minutely15.variables(16)!.valuesArray(),
		sunshine_duration: minutely15.variables(17)!.valuesArray(),
		freezing_level_height: minutely15.variables(18)!.valuesArray(),
		snowfall_height: minutely15.variables(19)!.valuesArray(),
		rain: minutely15.variables(20)!.valuesArray(),
		snowfall: minutely15.variables(21)!.valuesArray(),
		weather_code: minutely15.variables(22)!.valuesArray(),
		wind_speed_10m: minutely15.variables(23)!.valuesArray(),
		wind_speed_80m: minutely15.variables(24)!.valuesArray(),
		wind_direction_10m: minutely15.variables(25)!.valuesArray(),
		wind_direction_80m: minutely15.variables(26)!.valuesArray(),
		is_day: minutely15.variables(27)!.valuesArray(),
		lightning_potential: minutely15.variables(28)!.valuesArray(),
		cape: minutely15.variables(29)!.valuesArray(),
		visibility: minutely15.variables(30)!.valuesArray(),
		wind_gusts_10m: minutely15.variables(31)!.valuesArray(),
	},
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
		relative_humidity_2m: hourly.variables(1)!.valuesArray(),
		dew_point_2m: hourly.variables(2)!.valuesArray(),
		apparent_temperature: hourly.variables(3)!.valuesArray(),
		precipitation_probability: hourly.variables(4)!.valuesArray(),
		precipitation: hourly.variables(5)!.valuesArray(),
		rain: hourly.variables(6)!.valuesArray(),
		showers: hourly.variables(7)!.valuesArray(),
		snowfall: hourly.variables(8)!.valuesArray(),
		snow_depth: hourly.variables(9)!.valuesArray(),
		vapour_pressure_deficit: hourly.variables(10)!.valuesArray(),
		evapotranspiration: hourly.variables(11)!.valuesArray(),
		et0_fao_evapotranspiration: hourly.variables(12)!.valuesArray(),
		visibility: hourly.variables(13)!.valuesArray(),
		cloud_cover_high: hourly.variables(14)!.valuesArray(),
		cloud_cover_mid: hourly.variables(15)!.valuesArray(),
		cloud_cover_low: hourly.variables(16)!.valuesArray(),
		cloud_cover: hourly.variables(17)!.valuesArray(),
		surface_pressure: hourly.variables(18)!.valuesArray(),
		pressure_msl: hourly.variables(19)!.valuesArray(),
		weather_code: hourly.variables(20)!.valuesArray(),
		wind_speed_10m: hourly.variables(21)!.valuesArray(),
		wind_speed_80m: hourly.variables(22)!.valuesArray(),
		wind_speed_120m: hourly.variables(23)!.valuesArray(),
		wind_speed_180m: hourly.variables(24)!.valuesArray(),
		wind_direction_10m: hourly.variables(25)!.valuesArray(),
		wind_direction_80m: hourly.variables(26)!.valuesArray(),
		wind_direction_120m: hourly.variables(27)!.valuesArray(),
		wind_gusts_10m: hourly.variables(28)!.valuesArray(),
		wind_direction_180m: hourly.variables(29)!.valuesArray(),
		temperature_80m: hourly.variables(30)!.valuesArray(),
		temperature_180m: hourly.variables(31)!.valuesArray(),
		temperature_120m: hourly.variables(32)!.valuesArray(),
		soil_moisture_27_to_81cm: hourly.variables(33)!.valuesArray(),
		soil_moisture_9_to_27cm: hourly.variables(34)!.valuesArray(),
		soil_moisture_3_to_9cm: hourly.variables(35)!.valuesArray(),
		soil_moisture_1_to_3cm: hourly.variables(36)!.valuesArray(),
		soil_moisture_0_to_1cm: hourly.variables(37)!.valuesArray(),
		soil_temperature_54cm: hourly.variables(38)!.valuesArray(),
		soil_temperature_18cm: hourly.variables(39)!.valuesArray(),
		soil_temperature_6cm: hourly.variables(40)!.valuesArray(),
		soil_temperature_0cm: hourly.variables(41)!.valuesArray(),
		uv_index: hourly.variables(42)!.valuesArray(),
		uv_index_clear_sky: hourly.variables(43)!.valuesArray(),
		is_day: hourly.variables(44)!.valuesArray(),
		sunshine_duration: hourly.variables(45)!.valuesArray(),
		total_column_integrated_water_vapour: hourly.variables(46)!.valuesArray(),
		wet_bulb_temperature_2m: hourly.variables(47)!.valuesArray(),
		boundary_layer_height: hourly.variables(48)!.valuesArray(),
		freezing_level_height: hourly.variables(49)!.valuesArray(),
		convective_inhibition: hourly.variables(50)!.valuesArray(),
		lifted_index: hourly.variables(51)!.valuesArray(),
		cape: hourly.variables(52)!.valuesArray(),
		shortwave_radiation: hourly.variables(53)!.valuesArray(),
		direct_radiation: hourly.variables(54)!.valuesArray(),
		direct_normal_irradiance: hourly.variables(55)!.valuesArray(),
		global_tilted_irradiance: hourly.variables(56)!.valuesArray(),
		diffuse_radiation: hourly.variables(57)!.valuesArray(),
		terrestrial_radiation_instant: hourly.variables(58)!.valuesArray(),
		global_tilted_irradiance_instant: hourly.variables(59)!.valuesArray(),
		direct_normal_irradiance_instant: hourly.variables(60)!.valuesArray(),
		diffuse_radiation_instant: hourly.variables(61)!.valuesArray(),
		direct_radiation_instant: hourly.variables(62)!.valuesArray(),
		shortwave_radiation_instant: hourly.variables(63)!.valuesArray(),
		terrestrial_radiation: hourly.variables(64)!.valuesArray(),
	},
	daily: {
		time: Array.from(
			{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		weather_code: daily.variables(0)!.valuesArray(),
		temperature_2m_max: daily.variables(1)!.valuesArray(),
		apparent_temperature_max: daily.variables(2)!.valuesArray(),
		apparent_temperature_min: daily.variables(3)!.valuesArray(),
		temperature_2m_min: daily.variables(4)!.valuesArray(),
		uv_index_clear_sky_max: daily.variables(5)!.valuesArray(),
		uv_index_max: daily.variables(6)!.valuesArray(),
		sunshine_duration: daily.variables(7)!.valuesArray(),
		daylight_duration: daily.variables(8)!.valuesArray(),
		// Map Int64 values to according structure
		sunrise: [...Array(sunrise.valuesInt64Length())].map(
			(_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunset: [...Array(sunset.valuesInt64Length())].map(
			(_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		showers_sum: daily.variables(11)!.valuesArray(),
		rain_sum: daily.variables(12)!.valuesArray(),
		snowfall_sum: daily.variables(13)!.valuesArray(),
		precipitation_sum: daily.variables(14)!.valuesArray(),
		precipitation_probability_max: daily.variables(15)!.valuesArray(),
		precipitation_hours: daily.variables(16)!.valuesArray(),
		et0_fao_evapotranspiration: daily.variables(17)!.valuesArray(),
		shortwave_radiation_sum: daily.variables(18)!.valuesArray(),
		wind_direction_10m_dominant: daily.variables(19)!.valuesArray(),
		wind_gusts_10m_max: daily.variables(20)!.valuesArray(),
		wind_speed_10m_max: daily.variables(21)!.valuesArray(),
		temperature_2m_mean: daily.variables(22)!.valuesArray(),
		apparent_temperature_mean: daily.variables(23)!.valuesArray(),
		cape_mean: daily.variables(24)!.valuesArray(),
		cape_max: daily.variables(25)!.valuesArray(),
		cape_min: daily.variables(26)!.valuesArray(),
		cloud_cover_mean: daily.variables(27)!.valuesArray(),
		cloud_cover_min: daily.variables(28)!.valuesArray(),
		cloud_cover_max: daily.variables(29)!.valuesArray(),
		dew_point_2m_mean: daily.variables(30)!.valuesArray(),
		dew_point_2m_max: daily.variables(31)!.valuesArray(),
		dew_point_2m_min: daily.variables(32)!.valuesArray(),
		pressure_msl_min: daily.variables(33)!.valuesArray(),
		pressure_msl_max: daily.variables(34)!.valuesArray(),
		pressure_msl_mean: daily.variables(35)!.valuesArray(),
		snowfall_water_equivalent_sum: daily.variables(36)!.valuesArray(),
		relative_humidity_2m_max: daily.variables(37)!.valuesArray(),
		relative_humidity_2m_min: daily.variables(38)!.valuesArray(),
		relative_humidity_2m_mean: daily.variables(39)!.valuesArray(),
		precipitation_probability_min: daily.variables(40)!.valuesArray(),
		precipitation_probability_mean: daily.variables(41)!.valuesArray(),
		leaf_wetness_probability_mean: daily.variables(42)!.valuesArray(),
		growing_degree_days_base_0_limit_50: daily.variables(43)!.valuesArray(),
		et0_fao_evapotranspiration_sum: daily.variables(44)!.valuesArray(),
		surface_pressure_mean: daily.variables(45)!.valuesArray(),
		surface_pressure_max: daily.variables(46)!.valuesArray(),
		updraft_max: daily.variables(47)!.valuesArray(),
		surface_pressure_min: daily.variables(48)!.valuesArray(),
		visibility_mean: daily.variables(49)!.valuesArray(),
		visibility_min: daily.variables(50)!.valuesArray(),
		visibility_max: daily.variables(51)!.valuesArray(),
		winddirection_10m_dominant: daily.variables(52)!.valuesArray(),
		wind_gusts_10m_mean: daily.variables(53)!.valuesArray(),
		wind_speed_10m_mean: daily.variables(54)!.valuesArray(),
		wind_gusts_10m_min: daily.variables(55)!.valuesArray(),
		wind_speed_10m_min: daily.variables(56)!.valuesArray(),
		vapour_pressure_deficit_max: daily.variables(57)!.valuesArray(),
		wet_bulb_temperature_2m_min: daily.variables(58)!.valuesArray(),
		wet_bulb_temperature_2m_max: daily.variables(59)!.valuesArray(),
		wet_bulb_temperature_2m_mean: daily.variables(60)!.valuesArray(),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log(
	`\nCurrent time: ${weatherData.current.time}\n`,
	`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
	`\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
	`\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
	`\nCurrent is_day: ${weatherData.current.is_day}`,
	`\nCurrent snowfall: ${weatherData.current.snowfall}`,
	`\nCurrent wind_gusts_10m: ${weatherData.current.wind_gusts_10m}`,
	`\nCurrent wind_direction_10m: ${weatherData.current.wind_direction_10m}`,
	`\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
	`\nCurrent weather_code: ${weatherData.current.weather_code}`,
	`\nCurrent cloud_cover: ${weatherData.current.cloud_cover}`,
	`\nCurrent pressure_msl: ${weatherData.current.pressure_msl}`,
	`\nCurrent surface_pressure: ${weatherData.current.surface_pressure}`,
	`\nCurrent rain: ${weatherData.current.rain}`,
	`\nCurrent showers: ${weatherData.current.showers}`,
	`\nCurrent precipitation: ${weatherData.current.precipitation}`,
);
console.log("\nMinutely15 data:\n", weatherData.minutely15)
console.log("\nHourly data:\n", weatherData.hourly)
console.log("\nDaily data:\n", weatherData.daily)