import React, { useContext, useEffect, useMemo } from "react";
import moment from "moment";
import { Code } from "react-content-loader";
import { appContext } from "../../utils/appContext";
import { useGetWeatherDetailsBySearchQuery } from "../../utils/redux/GetWeatherInfo";
import UV from "../../assets/icons/UV.png";
import humidity from "../../assets/icons/humidity.png";
import sunrise from "../../assets/icons/sunrise.png";
import sunset from "../../assets/icons/sunset.png";
import wsw from "../../assets/icons/wsw.png";
import airQuality from "../../assets/icons/airQuality.png";
function Highlight() {
  const { weatherDetails, setWeatherDetails, metricType, city } =
    useContext(appContext);
  const { isFetching, data, error } = useGetWeatherDetailsBySearchQuery(
    {
      search: city,
      type: metricType,
    },
    { skip: !city }
  );

  const weathDetails = useMemo(() => {
    if (data && Object.keys(data).length > 0) {
      return data;
    }
  }, [data]);

  useEffect(() => {
    setWeatherDetails(weathDetails);
  }, [weathDetails, setWeatherDetails]);

  if (isFetching) {
    return <Code />;
  }
  if (error) {
    return <div className="text-red-400">{error?.data?.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="font-sans">Today's Highlights</div>
      <div className="flex flex-wrap gap-x-4 gap-y-4">
        <div className="bg-white border border-white rounded-lg py-2 w-[27.5%] h-48">
          <div className="text-[#B3B3B3] px-5">UV Index</div>
          <img alt="uv-graph" src={UV} className="mt-[-3px] w-80 h-[90%]" />
        </div>
        <div className="flex flex-col gap-6 bg-white border border-white rounded-lg py-2 px-5 w-[27.5%] h-48">
          <div className="text-[#B3B3B3]">Wind status</div>
          <div className="flex gap-2 items-end">
            <div className="text-6xl">{weatherDetails?.wind?.speed || ""}</div>
            <div>km/h</div>
          </div>

          <div className="flex gap-2 items-center">
            <img alt="wsw" src={wsw} className="w-8" />
            <span>WSW</span>
          </div>
        </div>
        <div className="flex flex-col gap-6 bg-white border border-white rounded-lg py-2 px-5 w-[27.5%] h-48">
          <div className="text-[#B3B3B3]">Sunrise & Sunset</div>
          <div className="flex gap-4">
            <img alt="sunrise" src={sunrise} className="w-10" />
            <div>
              <div>
                {weatherDetails?.sys?.sunrise
                  ? moment(weatherDetails?.sys?.sunrise * 1000).format("h:mm A")
                  : ""}
              </div>
              <div className="text-sm text-[#B5B5B5]">- 1m 46s</div>
            </div>
          </div>
          <div className="flex gap-4">
            <img alt="sunset" src={sunset} className="w-10" />
            <div>
              <div>
                {weatherDetails?.sys?.sunset
                  ? moment(weatherDetails?.sys?.sunset * 1000).format("h:mm A")
                  : ""}
              </div>
              <div className="text-sm text-[#B5B5B5]">+ 2m 22s</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 bg-white border border-white rounded-lg py-2 px-5 w-[27.5%] h-48">
          <div className="text-[#B3B3B3]">Humidity</div>
          <div className="flex justify-between">
            <div>
              <span className="text-6xl">
                {weatherDetails?.main?.humidity || ""}
              </span>{" "}
              <span className="absolute">%</span>
            </div>
            <img alt="humidity" src={humidity} className="w-8" />
          </div>

          <div>Normal 👍🏻</div>
        </div>
        <div className="flex flex-col gap-6 bg-white border border-white rounded-lg py-2 px-5 w-[27.5%] h-48">
          <div className="text-[#B3B3B3]">Visibility</div>
          <div className="flex gap-2 items-end">
            <div className="text-6xl">
              {weatherDetails?.visibility
                ? parseFloat(weatherDetails?.visibility / 1000).toFixed(2)
                : ""}
            </div>
            <div>km</div>
          </div>
          <div>Average 🙁</div>
        </div>
        <div className="flex flex-col gap-6 bg-white border border-white rounded-lg py-2 px-5 w-[27.5%] h-48">
          <div className="text-[#B3B3B3]">Air Quality</div>
          <div className="flex justify-between">
            <div className="text-6xl">105</div>
            <img alt="air-quality" src={airQuality} className="w-6" />
          </div>
          <div>Unhealthy 👎🏻</div>
        </div>
      </div>
    </div>
  );
}

export default Highlight;
