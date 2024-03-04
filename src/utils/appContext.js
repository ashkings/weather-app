import React, { createContext, useMemo, useState } from "react";

export const appContext = createContext(null);

function AppContextProvider({ children }) {
  const [metricType, setMetricType] = useState("metric");
  const [weatherDetails, setWeatherDetails] = useState({});
  const providerValue = useMemo(
    () => ({
      metricType,
      setMetricType,
      weatherDetails,
      setWeatherDetails,
    }),
    [metricType, setMetricType, weatherDetails, setWeatherDetails]
  );
  return (
    <appContext.Provider value={providerValue}>{children}</appContext.Provider>
  );
}

export default AppContextProvider;
