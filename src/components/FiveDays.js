import React from "react";
import Day from "./Day";
import { Link } from "react-router-dom";

export default function FiveDays(props) {
  const days = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  let day = props.list[0].dt_txt.slice(0, 10);
  let max = -1;
  let min = 999;

  const componentDay = (item, i) => {
    // temp max, min x dia
    if (day === item.dt_txt.slice(0, 10)) {
      if (item.main.temp_min < min) {
        min = item.main.temp_min;
        // console.log(`${day} min ${min}`);
      }
      if (item.main.temp_max > max) {
        max = item.main.temp_max;
        // console.log(`${day} max ${max}`);
      }
    } else {
      let currentMax = max;
      let currentMin = min;
      let currentDay = new Date(day);
      day = item.dt_txt.slice(0, 10);
      max = -1;
      min = 999;
      return (
        <Day
          day={days[currentDay.getDay()]}
          icon={item.weather[0].icon}
          max={currentMax}
          min={currentMin}
          key={i}
        />
      );
    }
  };
  return (
    <>
      <Link to="/day" className="d-flex">
        {props.list.map((item, i) => {
          if (day !== "") {
            return componentDay(item, i);
          }
        })}
      </Link>
    </>
  );
}
