import React, {useEffect, useState} from "react";
import {Card, Image, Dimmer, Loader, Message} from "semantic-ui-react";
import Feelslike from "./assets/feelslike.svg";
import Temperature from "./assets/temperature.svg";

const api_key = process.env.REACT_APP_API_KEY;
const units = "metric";
const locationApi = (place) => `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${api_key}`;
const watherApi = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`;

export const WeatherWidgetComponent = () => {
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loc = await (await fetch(locationApi("Almeria"))).json();
        const wather = await (await fetch(watherApi(loc[0].lat, loc[0].lon))).json();
        setWeatherData(wather)
      }
      catch (error) {
        console.error(error)
        setError(error)
      }
    }
    fetchData();
  }, [])

  if (error) {
    return (
      <Message error>Error loading data</Message>
    )
  }

  return (
    <>
      <h1>Weather Widget Component</h1>
      {!weatherData ? (
        <Dimmer active>
          <Loader content="Loading..." />
        </Dimmer>
      )
        : (
          <Card style={{textAlign: "center"}}>
            <Card.Content>
              <Card.Header>{weatherData.name} ({weatherData.sys.country})</Card.Header>
              <Image size="small" src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} />
              <Card.Description>
                <p>
                  <img
                    src={Temperature}
                    alt="Temperature Icon"
                    style={{height: '1em', verticalAlign: 'middle', marginRight: '4px'}}
                  />
                  Temperature: <b>{weatherData.main.temp} ºC</b>
                </p>
                <p>
                  <img
                    src={Feelslike}
                    alt="Feels Like Icon"
                    style={{height: '1em', verticalAlign: 'middle', marginRight: '4px'}}
                  />
                  Feels like: <b>{weatherData.main.feels_like} ºC</b>
                </p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Last page update: {Date().toLocaleString()}
            </Card.Content>
          </Card>
        )}
    </>
  )
}