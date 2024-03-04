import React, { useContext, useEffect, useMemo, useState } from "react";
import { Code } from "react-content-loader";
import moment from "moment";
import Search from "../common/Search";
import { useGetWeatherDetailsBySearchQuery } from "../../utils/redux/GetWeatherInfo";
import { useGetPhotosQuery } from "../../utils/redux/GetImage";
import useDefaultWeather from "../../utils/hooks/useDefaultWeather";
import { appContext } from "../../utils/appContext";
import { getIconUrl } from "../../utils/utility";
import cloud from "../../assets/icons/cloud.png";
import rain from "../../assets/icons/rain.png";

function SearchCity() {
  const [searchValue, setSearchValue] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const { metricType, weatherDetails, setWeatherDetails, city, setCity } =
    useContext(appContext);
  const {
    data: defaultData,
    isFetching: defaultFetching,
    error: defaultErr,
  } = useDefaultWeather();

  const { isFetching, data, error } = useGetWeatherDetailsBySearchQuery(
    {
      search: searchValue,
      type: metricType,
    },
    { skip: !searchClicked }
  );

  const { isFetching: imageFetching, data: imageData } = useGetPhotosQuery({
    search: city,
  });

  const weathDetails = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return defaultData;
    } else {
      return data;
    }
  }, [data, defaultData]);

  useEffect(() => {
    setWeatherDetails(weathDetails);
  }, [weathDetails, setWeatherDetails]);

  if (defaultFetching || isFetching || imageFetching) {
    return <Code />;
  }

  return (
    <div>
      <Search
        value={searchValue}
        handleChange={(e) => {
          setSearchValue(e.target.value);
          setSearchClicked(false);
        }}
        handleSubmit={() => {
          setSearchClicked(true);
          setCity(searchValue);
        }}
      />
      {error || defaultErr ? (
        <div className="text-red-400">
          {error?.data?.message || defaultErr?.data?.message}
        </div>
      ) : (
        <>
          <img
            src={getIconUrl(weatherDetails?.weather?.[0]?.icon)}
            alt="weather-icon"
            className="w-40 m-auto"
          />
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-6xl">
                {weatherDetails?.main?.temp || ""}
              </span>{" "}
              <span className="absolute text-xl">
                {metricType === "metric" ? "°C" : "°F"}
              </span>
            </div>
            <div className="text-xl">
              <span>
                {weatherDetails?.dt
                  ? moment(weatherDetails?.dt * 1000).format("dddd")
                  : ""}
                ,{" "}
              </span>
              <span className="text-[#B5B5B5]">
                {weatherDetails?.dt
                  ? moment(weatherDetails?.dt * 1000).format("HH:MM")
                  : ""}
              </span>
            </div>
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200"></hr>
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <img className="w-6" src={cloud} alt="cloud" />
              <div>{weatherDetails?.weather?.[0]?.main || ""}</div>
            </div>
            <div className="flex gap-4">
              <img className="w-6" src={rain} alt="rain" />
              <div>Rain - 30%</div>
            </div>
            <div>
              <div
                className="relative text-white"
                style={{ top: 90, left: 100 }}
              >
                {city}
              </div>
              <img
                className="border rounded-lg"
                style={{ width: 300, height: 150 }}
                src={imageData?.results?.[0]?.urls?.thumb}
                alt="city"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchCity;
