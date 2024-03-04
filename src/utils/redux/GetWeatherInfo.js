import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "../constants";

// Define a service using a base URL and expected endpoints
export const weatherInfo = createApi({
  reducerPath: "weatherInfo",
  baseQuery: fetchBaseQuery({ baseUrl: WEATHER_API_BASE_URL }),
  endpoints: (builder) => ({
    getWeatherDetailsBySearch: builder.query({
      query: (request) =>
        `2.5/weather?q=${request.search}&units=${
          request?.type || "metric"
        }&appid=${WEATHER_API_KEY}`,
    }),
    getCurrentLocationDetails: builder.query({
      query: (request) =>
        `2.5/weather?lat=${request.lat}&lon=${request.lon}&units=${
          request?.type || "metric"
        }&appid=${WEATHER_API_KEY}`,
    }),
    getForecastDetails: builder.query({
      query: (request) =>
        `2.5/forecast?q=${request.search}&units=${
          request?.type || "metric"
        }&appid=${WEATHER_API_KEY}`,
    }),
  }),
});

export const {
  useGetWeatherDetailsBySearchQuery,
  useLazyGetWeatherDetailsBySearchQuery,
  useLazyGetCurrentLocationDetailsQuery,
  useGetForecastDetailsQuery,
} = weatherInfo;
