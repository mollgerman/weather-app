import { useState, useRef, useContext } from "react"
import getCities from "../services/getCities"
import  CoordinatesContext from "./Context";



const SearchResults = ({ results, close }) => {
  const {setCoordinates, handleWeatherResults} = useContext(CoordinatesContext)
  const handleCityWeather = (coord) => {
    console.log(coord)
    setCoordinates(coord)
    handleWeatherResults({coord})
    close()
  }
  console.log(results)
  return (
    <>
      {results == "no response" ? (
        <div className="w-[18rem] lg:w-[20rem] h-[19rem] overflow-y-auto mx-auto mt-3 gap-1 flex flex-col rounded-md scrollbar-color">
          <a className="text-black bg-white-500 p-2 rounded-sm  text-center"> Could not find city</a>
        </div>
      ) : (
        <div className="w-[18rem] lg:w-[20rem] h-[19rem] overflow-y-auto mx-auto mt-3 gap-1 flex flex-col rounded-md scrollbar-color">
          {results.map((city) => {
            return (
              <a
                className="text-black bg-white-500 p-2 rounded-sm  border-b border-b-[#7a617486] hover:bg-gray-100 cursor-pointer"
                key={city.id}
                onClick={() => handleCityWeather(city.coordinates)}
              >
                {city.name + ",  "}
                {city.region + ",  "}
                {city.country}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

const SearchBar = ({ close, coordinates }) => {   
  const [data, setData] = useState('') 
  const inputRef = useRef()
  const hasResults = data?.length > 0

  

  const handleSubmit = async (event) => {
    event.preventDefault()
    const searchValue = inputRef.current.value
    let response = await getCities(searchValue)
    if (response.length == 0){
      response = 'no response'
    }
    setData(response)
  }


  return(
    <div className="absolute w-[85vw] mid:w-[20rem] h-[26rem] lg:w-[22rem] bg-[#fbfbfb] border-[.2rem] border-[#5cb2c1] rounded-[0.9rem] flex flex-col flex-basis">
      <button onClick={ close } className="self-end  text-blue-900 m-2 pr-2 transition ease-in-out delay-50 hover:-translate-y-[-1px] hover:scale-110 hover: duration-300 ">X</button>
      <div className="flex self-center border bg-white w-[min] mid:w-[18rem] lg:w-[20.5rem] justify-center flex-row rounded-[50px] ">
          <form className="form flex justify-between w-[15rem] mid:w-[18rem] lg:w-[20rem]" onSubmit={handleSubmit}>
            <input className="  ml-1 mr-2 rounded-xl py-1 pl-2 w-[10rem] mid:w-[19rem] lg:w-[19rem] focus:outline-none" ref={inputRef} autoFocus/>
            <button type='submit' className=" text-gray-500 pr-3  hover:text-black ">Search</button>
          </form>
      </div>

      {hasResults ?
        <SearchResults results={data} close={close}/>
      :
        <h2 className="text-black self-center text-[1.12rem] basis-1/2 my-auto ">Search a city</h2>
      }
      
      
    </div>
  )
}

export default SearchBar