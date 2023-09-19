import { useContext } from "react";
import  CoordinatesContext  from "./Context";

const CurrentWeather = ({ results }) => {
  const {unit, setUnit} = useContext(CoordinatesContext);

  const handleUnitChange = () => {
    setUnit(!unit);
  };

  return (
    <div className="flex flex-col justify-around  w-full text-gray-900 self-top">
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <h2 className="text-[1.8rem] p-1">
            <b>{results.city}</b>
          </h2>{" "}
          <div className="flex flex-row">
            <h2 className="text-[1.8rem] p-1 mr-2">
              {unit ? results.temp_f : results.temp_c}
            </h2>
            <div
              onClick={handleUnitChange}
              className="border border-blue-300 h-min rounded-[100px] text-xs px-2 pt-1.5 pb-1 transition ease-in-out duration-200 hover:cursor-pointer hover:scale-105 hover:shadow-lg hover:bg-slate-50"
            >
              {unit ? "C" : "F"}
            </div>
          </div>
        </div>

        <div className="flex gap-1 justify-start">
          <img className="w-[3rem] h-full  mr-2" src={results.condition.icon} />
          <h3 className="text-[1.5em] pt-1 text-gray-700 self-center">
            {results.condition.text}
          </h3>
        </div>
        <div className="transition ease-in-out bg-[#5cb2c190] h-[0.1rem] w-[70%] mt-6 ml-1"></div>
      </div>

      <div className="flex h-auto flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex flex-col self-end gap-2 ">
            <p>
              <b>Feels like: </b>{" "}
              {unit ? results.feelslike_f : results.feelslike_c}
            </p>
            <p>
              <b>Precipitation: </b>
              {unit ? results.precipitation_in : results.precipitation_mm}
            </p>
            <p>
              <b>Pressure:</b>{" "}
              {unit ? results.pressure_in : results.pressure_mb}
            </p>
            <p>
              <b>Wind:</b> {unit ? results.wind_mph : results.wind_kph}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-end">
            <p>
              <b>Wind Dir:</b> {results.wind_dir}
            </p>
            <p>
              <b>UV:</b> {results.uv}
            </p>
            <p>
              <b>Humidity:</b> {results.humidity}
            </p>
            <p>
              <b>Clouds:</b> {results.cloud}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
