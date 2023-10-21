import React, { useState } from "react";
import WeatherInfo from "./components/weather-info-component/weather-info-component";

function App() {
  const [zipCode, setZipCode] = useState("");

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  return (
    <div className="App">
      <h1>Weather Conditions and Defogging Method</h1>
      <input
        type="text"
        placeholder="Enter 5-Digit Zip Code"
        value={zipCode}
        onChange={handleZipCodeChange}
      />
      <WeatherInfo zipCode={zipCode} />
    </div>
  );
}

export default App;
