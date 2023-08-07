import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Card, Image, Dimmer, Loader, Message} from "semantic-ui-react";
import Feelslike from "./assets/feelslike.svg";
import Temperature from "./assets/temperature.svg";

const api_key = process.env.REACT_APP_API_KEY;
const units = "metric";
const locationApi = (place) => `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${api_key}`;
const watherApi = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`;

export const WeatherWidgetComponent = ({city}) => {
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setError()
    setWeatherData()
    const fetchData = async () => {
      try {
        const loc = await (await fetch(locationApi(city || "Almeria"))).json();
        if (!loc.length) {
          console.error("City not found")
          setError("City not found")
        } else {
          const wather = await (await fetch(watherApi(loc[0].lat, loc[0].lon))).json();
          setWeatherData(wather)
        }
      }
      catch (error) {
        console.error(error)
        setError(error)
      }
    }
    fetchData();
  }, [city])

  if (error) {
    return (
      <Message error>Error loading data: {error}</Message>
    )
  }

  return (
    <>
      <Card style={{textAlign: "center"}}>
        {!weatherData ? (
          <Dimmer active inverted>
            <Loader content="Loading..." />
          </Dimmer>
        )
          : (
            <>
              <Card.Content>
                <Card.Header>{weatherData.name} ({weatherData.sys.country})</Card.Header>
                <Image size="small" src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} />
                <Card.Description>
                  <p>
                    <img
                      src={Temperature}
                      alt="Temperature Icon"
                      style={{height: "1em", verticalAlign: "middle", marginRight: "4px"}}
                    />
                    Temperature: <b>{weatherData.main.temp} ºC</b>
                  </p>
                  <p>
                    <img
                      src={Feelslike}
                      alt="Feels Like Icon"
                      style={{height: "1em", verticalAlign: "middle", marginRight: "4px"}}
                    />
                    Feels like: <b>{weatherData.main.feels_like} ºC</b>
                  </p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                Last page update: {Date().toLocaleString()}
              </Card.Content>
            </>
          )}
      </Card>
    </>
  )
}

WeatherWidgetComponent.propTypes = {
  city: PropTypes.string,
};

WeatherWidgetComponent.defaultProps = {
  city: "Almeria"
};