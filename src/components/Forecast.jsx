import { useState, useContext } from "react";
import CoordinatesContext from "./Context";

export default function Forecast ({ results }) {

  const { unit } = useContext(CoordinatesContext);

  return (
    <div className=" ">
      {results.forecast.forecastday.map((day) => {
        const [isOpen, setIsOpen] = useState(false);
        const date = new Date(day.date.replace(/-/g, '\/'));
        const parsedDate = new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(date);

        const handleOpen = () => {
          setIsOpen(!isOpen);
        };

        return (
          <div
            key={day.date_epoch}
            className="border-[4px] border-[#ab88d3] rounded-[1rem] m-1 my-3 mt-0 p-1 px-3 flex  w-[95vw] mid:w-[23rem] sm:w-[31rem] md:w-[35rem] lg:w-[33rem] xl:w-[35rem] flex-col shadow-md shadow-[#5cb2c17f] bg-[#f0f0f0]"
          >
            <div className="flex justify-between">
              <p className="text-gray-900 text-[0.9rem] ">{parsedDate}</p>
              <div className="">
                <button className="border-[2px] border-[#ab88d3] h-min rounded-[5rem] px-2 transition ease-in-out duration-200 hover:cursor-pointer hover:scale-115 hover:shadow-lg hover:bg-slate-50" onClick={handleOpen}>{isOpen ? "-" : "+"}</button>
              </div>
            </div>
            <div className="flex flex-basis flex-col sm:flex-row sm:pt-1">
              <div className=" flex flex-col basis-6/12 ">
                <div className="flex  w-min   gap-5 sm:pr-4 self-center sm:self-auto pt-1 ">
                  <p className="text-[1.3rem] self-center">
                    <b>
                      {unit ? day.day.avgtemp_f : day.day.avgtemp_c}
                      {unit ? "°F" : "°C"}{" "}
                    </b>
                  </p>
                  <div className="flex text-[0.9rem] text-gray-700 w-min h-min gap-1 self-center colored-border px-[0.3rem] py-[0.1rem] ">
                    <p className="pt-[0.2rem]">
                      {unit ? day.day.mintemp_f : day.day.mintemp_c}
                      {unit ? "°F" : "°C"}
                    </p>
                    <p className="pt-[0.2rem]">-</p>
                    <p className="pt-[0.2rem]">
                      {unit ? day.day.maxtemp_f : day.day.maxtemp_c}
                      {unit ? "°F" : "°C"}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center sm:justify-normal">
                  <img
                    className="w-[2rem] h-full  mr-2"
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                  />
                  <p className="pt-1 text-gray-900">{day.day.condition.text}</p>
                </div>
              </div>
              <div className=" bg-[#63caca] h-[1px] mb-3 mt-2 mx-1 sm:h-[auto] sm:w-[1px] sm:mb-1 sm:mt-1 sm:mx-2"></div>
              <div className="flex justify-between  basis-7/12 text-[0.85rem] sm:ml-2 text-gray-900">
                <div className="self-center">
                  <p className="pt-1 sm:pt-0">
                    <b>Max wind: </b>
                    {unit ? day.day.maxwind_mph : day.day.maxwind_kph}
                    {unit ? "mph" : "kph"}
                  </p>
                  <p className="pt-1 sm:pt-0">
                    <b>Precipitations: </b>
                    {unit ? day.day.totalprecip_in : day.day.totalprecip_mm}
                    {unit ? "in" : "mm"}
                  </p>
                  <p className="pt-1 sm:pt-0">
                    <b>Humidity: </b> {day.day.avghumidity}%
                  </p>
                </div>
                <div className="self-center text-right">
                  <p className="pt-1 sm:pt-0">
                    <b>UV: </b> {day.day.uv}
                  </p>
                  <p className="pt-1 sm:pt-0">
                    <b>Rain: </b> {day.day.daily_chance_of_rain}%
                  </p>
                  <p className="pt-1 sm:pt-0">
                    <b>Visibility: </b> {day.day.avgvis_km}%
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex overflow-auto pt-1 sm:pt-2">
              {isOpen
                ? day.hour.map((hour) => {
                    return (
                      <div
                        key={hour.time_epoch}
                        className="border-[2px] border-[#5cb2c1]  rounded-[1rem] flex flex-col gap-1 w-min items-center justify-center mx-2 my-2 mt-3 sm:mt-0 sm:my-2 py-2"
                      >
                        <p className=" text-gray-900 text-[0.9rem]">
                          {hour.time.split(" ").slice(1)}
                        </p>
                        <p className="">
                          {unit ? hour.temp_f : hour.temp_c}
                          {unit ? "°F" : "°C"}
                        </p>
                        <div className="flex w-[6rem] mx-1 items-center justify-center">
                          <img
                            className="w-[2rem] h-min "
                            src={hour.condition.icon}
                          />
                          <p className="w-min text-gray-900 text-[0.78rem] overflow-hidden">
                            {hour.condition.text}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        )
      })}
    </div>
  );
};


