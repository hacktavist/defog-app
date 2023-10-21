import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherInfo({ zipCode }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // const API_KEY = "YOUR_API_KEY_HERE";

    // Check if zipCode is provided and not empty before making the API call
    if (zipCode && zipCode.length === 5) {
      axios
        .get(
          `https://api.tomorrow.io/v4/weather/realtime?location=${zipCode}&apikey=${process.env.REACT_APP_API_KEY}`
          //`https://api.tomorrow.io/v4/weather/realtime?location=${zipCode}&apikey=${API_KEY}`
        )
        .then((response) => {
          setWeatherData(response.data);
          console.log(response.data);
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
    const temperature = weatherData.data.values.temperature;
    const humidity = weatherData.data.values.humidity;
    const precipitation = weatherData.data.values.precipitationProbability;
    const season = getSeason();

    if (temperature < 32) {
      return handleLowTemperature(humidity, precipitation);
    }

    if (season === "Winter") {
      return handleWinterConditions(precipitation, humidity);
    }

    if (season === "Summer") {
      return handleSummerConditions(
        humidity,
        weatherData.data.values.visibility
      );
    }

    return "No specific defogging method required at the moment.";
  }

  function handleLowTemperature(humidity, precipitation) {
    if (precipitation > 0) {
      return humidity > 80
        ? "Use front and rear window defrosters to clear ice and air conditioning with defrost to handle condensation from precipitation."
        : "Use front and rear window defrosters to clear ice caused by precipitation.";
    }
    return "Use front and rear window defrosters to clear ice.";
  }

  function handleWinterConditions(precipitation, humidity) {
    if (precipitation > 0) {
      return humidity > 80
        ? "Use air conditioning with defrost to remove condensation caused by snow or sleet."
        : "Use air conditioning with defrost to remove condensation caused by snow or sleet.";
    }

    return "No specific defogging method required at the moment.";
  }

  function handleSummerConditions(humidity, visibility) {
    if (humidity > 80) {
      return "Use air conditioning with defrost to remove condensation caused by high humidity.";
    }

    if (visibility === "Low") {
      return "Low visibility suggests potential fogging; use defogging methods if needed.";
    }

    return "No specific defogging method required at the moment.";
  }

  // Helper function to get the season based on the current month
  function getSeason() {
    const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed
    if (currentMonth >= 1 && currentMonth <= 3) {
      return "Winter";
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      return "Spring";
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      return "Summer";
    }

    return "Fall";
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
