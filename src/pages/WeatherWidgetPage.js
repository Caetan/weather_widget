import React, {useState} from "react";
import { InputWeatherWidgetComponent } from "../components/WeatherWidgetComponent/InputWeatherWidgetComponent";
import { WeatherWidgetComponent } from "../components/WeatherWidgetComponent/WeatherWidgetComponent";
import { Container } from "semantic-ui-react";

export const WeatherWidgetPage = () => {
  const [city, setCity] = useState();
  return (
    <Container>
      <InputWeatherWidgetComponent setCity={setCity} />
      <WeatherWidgetComponent city={city} />
    </Container>
  )
}
