export default function Day(props) {
  const createIconUrl = () => {
    return `http://openweathermap.org/img/wn/${props.icon}@2x.png`;
  };

  return (
    <>
      <div className="boxDay flex border">
        <p className="day-name">{props.day}</p>
        <img className="box-icon" src={createIconUrl()} alt="img" />
        <p className="day-temp">
          {Math.floor(props.max)}°/{Math.floor(props.min)}°
        </p>
      </div>
    </>
  );
}
