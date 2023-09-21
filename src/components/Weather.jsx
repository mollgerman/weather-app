import { useState, lazy } from "react";
import SearchBar from "./SearchBar";
import useWeather from "../hooks/useWeather";
const CurrentWeather = lazy(() => import("./CurrentWeather"));
const Forecast = lazy(() => import("./Forecast"));
import CoordinatesContext from "./Context";
import { useEffect } from "react";

const Weather = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [coordinates, setCoordinates] = useState("");
  const { results, weatherResults, loading } = useWeather({ coordinates });
  const [unit, setUnit] = useState(true);

  const handleWeatherResults = ({ coord }) => {
    weatherResults(coord);
  };
  const handleSearch = () => {
    setShowSearchBar(true);
  };
  const handleCloseSearch = () => {
    setShowSearchBar(false);
  };

const useLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
}

function success(position) {
  const latitude = position.coords.latitude.toString().slice(0, -2);
  const longitude = position.coords.longitude.toString().slice(0, -2);
  const coord = latitude + ',' + longitude
  setCoordinates(coord)
  handleWeatherResults({coord})
}

function error() {
  console.log("Unable to retrieve your location");
}

  return (
    <CoordinatesContext.Provider
      value={{
        coordinates,
        setCoordinates,
        handleWeatherResults,
        unit,
        setUnit,
      }}
    >
      <div
        className={`flex  ${
          loading
            ? "justify-center"
            : "flex-col gap-3 lg:flex-row justify-around"
        }   my-[3rem] mb-0  sm:p-[3rem] items-center lg:items-start`}
      >
        <div className="flex flex-col h-min  w-min p-4 gap-2 border-[4px] border-[#5cb2c1] shadow-lg shadow-[#ab88d3a7] rounded-[0.9rem]">
          <div className="w-[80vw] mid:w-[20rem] lg:w-[22rem] flex  justify-center">
            <button
              className="transition ease-in-out  px-4 lg:px-6 py-1 rounded-[50px] border-[#5cb2c1] border-[3px] hover:scale-105 ring ring-transparent hover:ring-[#5cb2c1] hover:ring-offset-1 hover:border-[#f0f0f0]"
              onClick={handleSearch}
            >
              Search City
            </button>
            {coordinates.length == 0 ? useLocation() : null}
            {showSearchBar ? <SearchBar close={handleCloseSearch} /> : " "}
          </div>
          <div
            className={
              loading
                ? "w-[80vw] mid:w-[20rem] lg:w-[22rem] h-[20rem] flex flex-col justify-center"
                : "w-[80vw] mid:w-[20rem] lg:w-[22rem] h-[20rem] flex justify-center"
            }
          >
            {loading ? (
              <h1 className="self-center text-[1.3rem] pb-10">
                Search for a city
              </h1>
            ) : (
              <CurrentWeather results={results} />
            )}
          </div>
        </div>
        <div className="">
          {loading ? (
            <h1 className="self-center text-[1.3rem] pb-10"></h1>
          ) : (
            <Forecast results={results} />
          )}
        </div>
      </div>
    </CoordinatesContext.Provider>
  );
};

export default Weather;
