import { useEffect } from "react";
import {
  useLazyGetCurrentLocationDetailsQuery,
  useLazyGetWeatherDetailsBySearchQuery,
} from "../redux/GetWeatherInfo";
import { DEFAULT_CITY } from "../constants";

function useDefaultWeather() {
  const [
    getDefaultDetails,
    {
      isFetching: defaultDetailsLoading,
      error: defaultDetailsErr,
      data: defaultDetailsData,
      isSuccess: defaultDetailsSuccess,
    },
  ] = useLazyGetWeatherDetailsBySearchQuery();
  const [
    getCurrentDetails,
    {
      isFetching: currentDetailsLoading,
      error: currentDetailsErr,
      data: currentDetailsData,
      isSuccess: currentDetailsSuccess,
    },
  ] = useLazyGetCurrentLocationDetailsQuery();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getCurrentDetails({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            // Call this default implementation if permissions denied
            getDefaultDetails({ search: DEFAULT_CITY });
            console.log(error.message);
          }
        );
      } else {
        // Call this default implementation
        getDefaultDetails({ search: DEFAULT_CITY });
        console.log("Geolocation is not supported by your browser.");
      }
    };

    getLocation();
  }, [getCurrentDetails, getDefaultDetails]);

  return {
    isFetching: currentDetailsLoading || defaultDetailsLoading,
    error: currentDetailsErr || defaultDetailsErr,
    data: currentDetailsData || defaultDetailsData,
    isSuccess: currentDetailsSuccess || defaultDetailsSuccess,
  };
}

export default useDefaultWeather;
