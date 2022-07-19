import React from "react";

export default function Day(props) {
  const createIconUrl = () => {
    return `http://openweathermap.org/img/wn/${props.icon}@2x.png`;
  };

  return (
    <>
      <div className="boxDay flex border">
        <p>{props.day}</p>
        <img src={createIconUrl()} alt="img" />
        <p>
          {Math.floor(props.max)}°/{Math.floor(props.min)}°
        </p>
      </div>
    </>
  );
}
