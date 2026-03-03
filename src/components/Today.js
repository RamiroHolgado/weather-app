export default function Today({ weather, city }) {
  if (!weather || !weather.main) return null;

  const createDate = () => {
    const d = new Date(weather.dt * 1000);
    return d.toLocaleString("es-AR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const createIconUrl = () => {
    const icon = weather.weather?.[0]?.icon;
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <div className="today flex">
      <div className="today-left">
        {/* <h2 className="city">{city}</h2> */}
        <h1 className="temp">{Math.round(weather.main.temp)}°</h1>
        <p className="cond">{weather.weather?.[0]?.description}</p>
        <p className="date">{createDate()}</p>
      </div>
      <div className="today-right">
        <img className="today-icon" src={createIconUrl()} alt="icon" />
        <div className="today-meta">
          <p>Max {Math.round(weather.main.temp_max)}°</p>
          <p>Min {Math.round(weather.main.temp_min)}°</p>
          <p>Humedad {weather.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
}
