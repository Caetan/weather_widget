import React, {useEffect, useState} from "react";

const api_key = process.env.REACT_APP_API_KEY;
const locationApi = (place) => `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${api_key}`
const watherApi = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

export const WeatherWidgetComponent = () => {
  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const loc = await (await fetch(locationApi("Malaga"))).json();
      const wather = await (await fetch(watherApi(loc[0].lat, loc[0].lon))).json();
      setWeatherData(wather)
    }
    fetchData().catch(console.error);
  }, [])

  return (
    <>
      <h1>Weather Widget Component</h1>
      {JSON.stringify(weatherData, null, 2)}
    </>
  )
}