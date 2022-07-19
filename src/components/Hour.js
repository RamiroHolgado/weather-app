import React from "react";

export default function Hour(props) {
  const formatHour = () => {
    let hs = parseInt(props.hour.slice(11, 16)) - 3;
    if (Math.sign(hs) === -1) {
      return `${24 + hs}:00`;
    } else {
      if (hs.toString().length === 1) {
        return `0${hs}:00`;
      } else {
        return `${hs}:00`;
      }
    }
  };
  return (
    <>
      <div className="hourBox flex border">
        <p>{formatHour()}</p>
        <img src={props.icon} alt="" />
        <p>{Math.floor(props.temp)}°</p>
        {/* <img src="" alt="" /> */}
        <p>{props.humidity}%</p>
      </div>
    </>
  );
}
