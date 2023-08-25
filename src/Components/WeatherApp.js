import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const getWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=a4015995f46410a80f7093c216e25d48`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  };

  let getCurrentTime = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    return currentDate;
  };

  let getTemperature = (elements) => {
    let Temp = elements - 273;
    return Math.round(Temp);
  };

  let getHighTemperature = (elements) => {
    let highTemp = elements - 273;
    return Math.round(highTemp);
  };

  let getLowTemperature = (elements) => {
    let lowTemp = elements - 273;
    return Math.round(lowTemp);
  };

  let windSpeed = (elements) => {
    let kilometer = elements * 1.6;
    return Math.round(kilometer);
  };

  let getVisibility = (elements) => {
    let visibilityTokilometer = elements * 0.001;
    return Math.round(visibilityTokilometer);
  };

  let getSunriseTime = (elements) => {
    const sunriseDate = new Date(elements * 1000); // convert to milliseconds
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const indianSunriseTime = sunriseDate.toLocaleString("en-IN", options);
    return indianSunriseTime;
  };

  let getSunsetTime = (elements) => {
    const sunsetDate = new Date(elements * 1000);
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const indianSunsetTime = sunsetDate.toLocaleString("en-IN", options);
    return indianSunsetTime;
  };

  return (
    <div className="weatherApp">
      <div className="weatherAppContent">
        <h1>Weather App</h1>
        <Form className="searchContent">
          <Form.Control
            type="text"
            placeholder="Enter a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="formInput"
            required
          />

          <Form.Control
            type="text"
            placeholder="Enter a country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="formInput"
            required
          />

          <Button variant="secondary" size="sm" onClick={getWeatherData}>
            Search
          </Button>
        </Form>
        {weatherData && (
          <div>
            <div className="weatherDetails">
              <h3>
                {weatherData.name}, {weatherData.sys.country} Weather
              </h3>
              <p>As of {getCurrentTime()}</p>
              <div className="temperatureDetails">
                <p className="temperatureInCelsius">
                  {getTemperature(weatherData.main.temp)}
                  <sup>o</sup> C
                </p>
                <p>{weatherData.weather[0].description}</p>
              </div>
            </div>
            <div className="climateDetails">
              <table>
                <tr>
                  <th>High/Low :</th>
                  <td>
                    {getHighTemperature(weatherData.main.temp_max)}/
                    {getLowTemperature(weatherData.main.temp_min)}
                  </td>
                </tr>
                <tr>
                  <th>Humidity :</th>
                  <td>{weatherData.main.humidity} %</td>
                </tr>
                <tr>
                  <th>Pressure :</th>
                  <td>{weatherData.main.pressure} hpa</td>
                </tr>
                <tr>
                  <th>Visibility :</th>
                  <td>{getVisibility(weatherData.visibility)} km</td>
                </tr>
              </table>
              <table>
                <tr>
                  <th>Wind :</th>
                  <td>{windSpeed(weatherData.wind.speed)} km/hr</td>
                </tr>
                <tr>
                  <th>Wind Direction :</th>
                  <td>
                    {weatherData.wind.deg}
                    <sup>o</sup> deg
                  </td>
                </tr>
                <tr>
                  <th>Sunrise :</th>
                  <td>{getSunriseTime(weatherData.sys.sunrise)}</td>
                </tr>
                <tr>
                  <th>Sunset :</th>
                  <td>{getSunsetTime(weatherData.sys.sunset)}</td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
