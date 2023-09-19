

const getCities = (search) => {
  const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${search}`
  const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_WEATHER_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      },
  }
  const cityList = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      return(result?.map((city => ({
        id: city.id,
        name: city.name,
        region: city.region,
        country: city.country,
        coordinates: city.lat + ',' + city.lon
      })
      )))
        
    } catch (error) {
      console.log(error)
    }
  }
  return (
    cityList()
  )
}

export default getCities