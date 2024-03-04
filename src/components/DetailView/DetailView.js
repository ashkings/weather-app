import React, { useContext, useEffect } from "react";
import { Code } from "react-content-loader";
import ForecastWeeks from "./ForecastWeeks";
import Highlight from "./Highlight";
import { appContext } from "../../utils/appContext";
import { useGetForecastDetailsQuery } from "../../utils/redux/GetWeatherInfo";
import { DEFAULT_CITY } from "../../utils/constants";
import user from "../../assets/icons/user.png";

function DetailView() {
  const { metricType, setMetricType } = useContext(appContext);

  const { isFetching, data, error } = useGetForecastDetailsQuery({
    search: DEFAULT_CITY,
  });

  useEffect(() => {
    console.log(metricType, "metric");
  }, [metricType]);

  if (isFetching) {
    return <Code />;
  }

  if (error) {
    return <div className="text-red-400">{error?.data?.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="mb-4 ">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li>
              <button
                className="inline-block p-4 dark:text-gray-300"
                id="today-tab"
              >
                Today
              </button>
            </li>
            <li>
              <button
                className="inline-block p-4 border-b-2 rounded-t-lg border-black"
                id="week-tab"
              >
                Week
              </button>
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <div className="flex gap-4">
            <MetricButton
              text="°C"
              metricType={metricType}
              compareType="metric"
              handleClick={() => setMetricType("metric")}
            />
            <MetricButton
              text="°F"
              compareType="imperial"
              metricType={metricType}
              handleClick={() => setMetricType("imperial")}
            />
          </div>
          <img src={user} alt="user-icon" className="w-14 h-14" />
        </div>
      </div>
      <ForecastWeeks data={data} />
      <Highlight data={data} />
    </div>
  );
}

export default DetailView;

const MetricButton = ({ text, metricType, compareType, handleClick }) => {
  return (
    <button
      className={`rounded-full ${
        metricType === compareType ? "bg-black" : "bg-white"
      } ${metricType === compareType ? "text-white" : "text-black"} w-10 h-10`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
