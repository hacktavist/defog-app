import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherInfo({ zipCode }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const API_KEY = "YOUR_TOMORROW_IO_API_KEY";

    // Check if zipCode is provided and not empty before making the API call
    if (zipCode && zipCode.length === 5) {
      axios
        .get(
          `https://api.tomorrow.io/v4/timelines?location=${zipCode}&apikey=${API_KEY}`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [zipCode]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Function to determine the defogging method
  function determineDefoggingMethod(weatherData) {
    const temperature = weatherData.temperature;
    const humidity = weatherData.humidity;
    const precipitation = weatherData.precipitation;
    const windSpeed = weatherData.windSpeed;

    if (temperature < 32) {
      return "Use front and rear window defrosters to clear ice.";
    } else if (temperature > 32 && humidity > 80 && precipitation > 0) {
      return "Use air conditioning with defrost to remove condensation.";
    } else if (windSpeed > 20) {
      return "Expect rapid fog dissipation due to high wind speeds.";
    } else {
      return "No specific defogging method required at the moment.";
    }
  }

  const suggestedMethod = determineDefoggingMethod(weatherData);

  return (
    <div>
      <h1>Defogging Method:</h1>
      <p>{suggestedMethod}</p>
    </div>
  );
}

export default WeatherInfo;
