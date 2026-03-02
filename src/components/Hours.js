import React from "react";

export default function Hours({ list }) {
  if (!list || !list.length) return null;

  const hours = list.slice(0, 12);

  const formatHour = (dt_txt) => {
    let hs = parseInt(dt_txt.slice(11, 13), 10) - 3;
    if (hs < 0) hs = 24 + hs;
    return (hs < 10 ? `0${hs}` : hs) + ":00";
  };

  return (
    <div className="hours-list">
      {hours.map((item, i) => (
        <div className="boxDay flex border" key={i}>
          <p className="hour-time">{formatHour(item.dt_txt)}</p>
          <img
            className="box-icon"
            src={`http://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`}
            alt=""
          />
          <p className="hour-temp">{Math.round(item.main.temp)}°</p>
          <p className="hour-humidity">{item.main.humidity}%</p>
        </div>
      ))}
    </div>
  );
}
