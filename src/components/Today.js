import React, { useEffect, useState } from "react";

export default function Today(props) {
  const [weather, setWeather] = useState({});
  const getWeather = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=-34.921206515412955&lon=-57.95481121617784&units=metric&lang=es&appid=e13a4de7d97c9fd3717863271561b6a6"
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };
  useEffect(() => {
    getWeather();
  }, []);

  const createDate = () => {
    let date = String(Date()).slice(0, 10).split(" ");
    // console.log(date);
    return `${date[0]} ${date[2]} ${date[1]}`;
  };
  const createIconUrl = () => {
    let icon = weather.weather[0].icon;
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };
  return (
    <>
      {typeof weather.main != "undefined" ? (
        <div className="flex">
          <div className="img-container">
            <h1>{Math.floor(weather.main.temp)}°</h1>
            <img src={createIconUrl()} alt="" />
          </div>
          <h4>{weather.name}</h4>
          <h6>
            {Math.floor(weather.main.temp_max)}°/
            {Math.floor(weather.main.temp_min)}° - sensacion termica{" "}
            {Math.floor(weather.main.feels_like)}°
          </h6>
          <h6>{createDate()}</h6>
        </div>
      ) : (
        "ERROR"
      )}
    </>
  );
}
