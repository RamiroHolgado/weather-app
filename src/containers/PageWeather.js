import React, { useState, useEffect } from "react";

import "../assets/css/PageWeather.css";
import Today from "../components/Today";
import Hours from "../components/Hours";
import FiveDays from "../components/FiveDays";

export default function PageHome(props) {
  const [weather, setWeather] = useState({});
  const getWeather = () => {
    console.log(props);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${props.coords[0].lat}&lon=${props.coords[0].lon}&units=metric&lang=es&appid=e13a4de7d97c9fd3717863271561b6a6`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        // console.log("file: PageWeather.js ~ line 17 ~ result", result);
      });
  };
  useEffect(() => {
    // getWeather();
    console.log("weather " + weather.list);
  }, []);
  return (
    <>
      {typeof weather.list != "undefined" ? (
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 paddTop">
              <Today />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 offset-md-3 paddTop">
              <Hours {...weather} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2 paddTop">
              <FiveDays {...weather} />
            </div>
          </div>
        </div>
      ) : (
        "ERROR"
      )}
    </>
  );
}
