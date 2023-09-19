import getWeather from '../services/getWeather'
import { useState } from 'react'

const useWeather = ({}) => {

    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState({})

  const weatherResults = async (coordinates) => {
    try {
      setLoading(true)
      const newWeather = await getWeather(coordinates)
      setResults(newWeather)
    } catch (error) {
      
    }finally {
      setLoading(false)
    }
  }
  return {results, weatherResults, loading}
}

export default useWeather