import React, { useMemo } from "react";
import moment from "moment";
import { arrayGroup, getIconUrl } from "../../utils/utility";
function ForecastWeeks({ data }) {
  const forecastWeeks = useMemo(() => {
    return arrayGroup((item) => item.dt_txt.split(" ")[0], data?.list);
  }, [data]);

  console.log(forecastWeeks, "forecastWeeks");

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {Object.keys(forecastWeeks).map((week) => {
          /* Taking first value of each item 
             in real time we will get data according to current timestamp*/
          const currentTimestamp = forecastWeeks[week][0];
          return (
            <div
              key={week}
              className="bg-white border border-white rounded-lg p-4 w-[136px] h-max text-center"
            >
              <header>
                {moment(currentTimestamp?.dt * 1000).format("ddd")}
              </header>
              <img
                src={getIconUrl(currentTimestamp?.weather?.[0]?.icon)}
                alt="weather-icon"
              />
              <footer>
                <span className="text-sm">
                  {currentTimestamp?.main?.temp_max}°
                </span>{" "}
                <span className="text-sm text-[#B5B5B5]">
                  {currentTimestamp?.main?.temp_min}°
                </span>
              </footer>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastWeeks;
