import React from "react";
import Hour from "./Hour";

export default function hours(props) {
  // console.log(props.list);
  const createIconUrl = (i) => {
    let icon = props.list[i].weather[0].icon;
    return `http://openweathermap.org/img/wn/${icon}.png`;
  };
  return (
    <>
      <div className="hoursBox flex">
        {props.list.slice(0, 12).map((item, i) => {
          return (
            <Hour
              hour={item.dt_txt}
              temp={item.main.temp}
              humidity={item.main.humidity}
              icon={createIconUrl(i)}
              key={i}
            />
          );
        })}
      </div>
    </>
  );
}
