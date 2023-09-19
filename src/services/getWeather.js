

const getWeather = (coordinates) => {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${coordinates}&days=4`
  const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_WEATHER_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      },
  }
  const weather = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return ({
        city: result.location.name,
        temp_c: result.current.temp_c + '°C',
        temp_f: result.current.temp_f + '°F',
        condition: result.current.condition,
        wind_kph: result.current.wind_kph + 'kph',
        wind_mph: result.current.wind_mph + 'mph',
        wind_dir: result.current.wind_dir,
        pressure_mb: result.current.pressure_mb + 'mbar',
        pressure_in: result.current.pressure_in + 'in',
        precipitation_mm: result.current.precip_mm + 'mm',
        precipitation_in: result.current.precip_in + 'in',
        humidity: result.current.humidity + '%',
        cloud: result.current.cloud + '%',
        feelslike_c: result.current.feelslike_c + '°C',
        feelslike_f: result.current.feelslike_f + '°F',
        uv: result.current.uv,
        forecast: result.forecast
        
      })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    weather()
  )
}

export default getWeather