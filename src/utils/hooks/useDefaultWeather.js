import { useContext, useEffect, useState } from "react";
import { useLazyGetWeatherDetailsBySearchQuery } from "../redux/GetWeatherInfo";
import { DEFAULT_CITY, WEATHER_API_KEY } from "../constants";
import { appContext } from "../appContext";

function useDefaultWeather() {
  const { city, setCity } = useContext(appContext);
  const [loading, setLoading] = useState(true);
  const [
    getDefaultDetails,
    {
      isFetching: defaultDetailsLoading,
      error: defaultDetailsErr,
      data: defaultDetailsData,
      isSuccess: defaultDetailsSuccess,
    },
  ] = useLazyGetWeatherDetailsBySearchQuery();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLoading(true);
            let res = await fetch(
              `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${WEATHER_API_KEY}`
            );
            res = await res.json();
            setCity(res?.[0]?.name);
            setLoading(false);
          },
          (error) => {
            // Call this default implementation if permissions denied
            setCity(DEFAULT_CITY);
            console.log(error.message);
          }
        );
      } else {
        // Call this default implementation
        setCity(DEFAULT_CITY);
        console.log("Geolocation is not supported by your browser.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (city) {
      getDefaultDetails({ search: city });
    }
  }, [city]);

  return {
    isFetching: defaultDetailsLoading || loading,
    error: defaultDetailsErr,
    data: defaultDetailsData,
    isSuccess: defaultDetailsSuccess,
  };
}

export default useDefaultWeather;
