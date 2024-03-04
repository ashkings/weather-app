import React from "react";
import SearchCity from "./components/searchCity/SearchCity";
import DetailView from "./components/DetailView/DetailView";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store";
import AppContextProvider from "./utils/appContext";

function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <div className="flex flex-row gap-4">
          <div className="basis-1/4 p-8">
            <SearchCity />
          </div>
          <div className="basis-3/4 p-8 bg-[#F6F6F8]">
            <DetailView />
          </div>
        </div>
      </AppContextProvider>
    </Provider>
  );
}

export default App;
