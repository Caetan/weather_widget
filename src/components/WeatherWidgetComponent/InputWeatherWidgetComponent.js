import React, {useEffect, useState} from "react";
import {Input} from "semantic-ui-react";


export const InputWeatherWidgetComponent = ({setCity}) => {
  const [userInput, setUserInput] = useState()

  // Comment this for using the button
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setCity(userInput);
    }, 1000);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [userInput, setCity]);

  return (
    <>
      <h1>Weather Widget Component</h1>
      <Input label="City" placeholder="Almeria" onChange={(evt) => {
        setUserInput(evt.target.value)
      }}/>
      {/* <Button onClick={() => setCity(userInput)}>Search</Button> */}
    </>
  )
}
