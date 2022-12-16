import { useState } from "react";
import axios from "axios";
import kelvinToCelsius from "../components/utils/kelvinToCelsius";

const CountryDetails = ({ country }) => {
  const [temprature, setTemperature] = useState();
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState("");

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=0ce6697e86df4b43804fbdaa96900338`
    )
    .then((response) => {
      setTemperature(
        Math.round(kelvinToCelsius(response.data.main.temp) * 10) / 10
      );
      setWind(response.data.wind.speed);
      setIcon(response.data.weather[0].icon);
    });

  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>Language:</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.png} alt={`${country.name} flag`} />
      </div>
      <h2>Weather in {country.capital[0]}</h2>
      <div>Temperature: {temprature} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <div>Wind: {wind} m/s</div>
    </>
  );
};

export default CountryDetails;
