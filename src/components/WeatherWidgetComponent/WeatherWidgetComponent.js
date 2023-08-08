import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Card, Image, Dimmer, Loader, Message} from "semantic-ui-react";
import Feelslike from "./assets/feelslike.svg";
import Temperature from "./assets/temperature.svg";


const tmpStyle = {height: "1em", verticalAlign: "middle", marginRight: "4px"}

const api_key = process.env.REACT_APP_API_KEY;
const units = "metric";
const locationApi = (place) => `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${api_key}`;
const watherApi = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`;



const fetchData = async (city) => {
  // try {
  const loc = await (await fetch(locationApi(city))).json();
  if (!loc.length) {
    console.error("City not found")
  } else {
    const wather = await (await fetch(watherApi(loc[0].lat, loc[0].lon))).json();
    return wather
  }
  // }
  // catch (error) {
  //   setError(error)
  // }
}

export const WeatherWidgetComponent = ({city}) => {
  const cities = ["Almería", "Granada", "Málaga", "Jaén", "Córdoba", "Sevilla", "Huelva", "Cádiz"]
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();
  const [avgtmp, setAvgTemp] = useState();
  let avgTemp = 0

  useEffect(() => {
    const tmpWeather = []
    async function fetchData2() {
    // setError()
    // setWeatherData()
    cities.forEach(async (city) => {
      const data = await fetchData(city)
      tmpWeather.push({"city": city, "data": data});
      console.log(data.main.temp, avgTemp)
      avgTemp = avgTemp + data.main.temp
    })
  }
  fetchData2();
  setWeatherData(tmpWeather)
  setAvgTemp(avgTemp / 8)
  }, [])
  console.log(avgtmp)

  if (error) {
    return (
      <Message error>Error loading data: {error}</Message>
    )
  }

  return (
    <>
    Andalusia AVG Temperature = {avgTemp}
     {/* {!weatherData ? (
          <Dimmer active inverted>
            <Loader content="Loading..." />
          </Dimmer>
          )
          : ( */}
    <Card.Group>
      {weatherData?.map(({city, data: weatherData}) => {
        return (
        <Card style={{textAlign: "center"}} key={city}>
         
            <Card.Content>
              <Card.Header>{weatherData.name} ({weatherData.sys.country})</Card.Header>
              <Image size="small" src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} />
              <Card.Description>
                <p>
                  <img
                    src={Temperature}
                    alt="Temperature Icon"
                    style={tmpStyle}
                  />
                  Temperature: <b>{weatherData.main.temp} ºC</b>
                </p>
                <p>
                  <img
                    src={Feelslike}
                    alt="Feels Like Icon"
                    style={tmpStyle}
                  />
                  Feels like: <b>{weatherData.main.feels_like} ºC</b>
                </p>
              </Card.Description>
            </Card.Content>
            {/* <Card.Content extra>
                Last page update: {Date().toLocaleString()}
              </Card.Content> */}
          {/* ) */}
        </Card>

      )})}
    </Card.Group>
          {/* )} */}
    </>
  )
}

WeatherWidgetComponent.propTypes = {
  city: PropTypes.string,
};

WeatherWidgetComponent.defaultProps = {
  city: "Almeria"
};