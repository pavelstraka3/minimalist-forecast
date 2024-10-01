import { fetchWeatherApi } from "openmeteo";

export interface WeatherData {
  time: string;
  temperature2m: number;
}

export const fetchWeatherData = async (): Promise<WeatherData[]> => {
  const params = {
    hourly: "temperature_2m",
    latitude: 50.1415936,
    longitude: 14.0935168,
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      params.latitude = position.coords.latitude;
      params.longitude = position.coords.longitude;
    });
  }

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  // const timezone = response.timezone();
  // const timezoneAbbreviation = response.timezoneAbbreviation();
  // const latitude = response.latitude();
  // const longitude = response.longitude();

  const hourly = response.hourly()!;

  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
  };

  // for (let i = 0; i < weatherData.hourly.time.length; i++) {
  //     console.log(
  //         weatherData.hourly.time[i].toISOString(),
  //         weatherData.hourly.temperature2m[i]
  //     );
  // }

  return weatherData.hourly.time.map((t) => {
    return {
      time: t.toISOString(),
      temperature2m:
        weatherData.hourly.temperature2m[weatherData.hourly.time.indexOf(t)],
    };
  });
};
