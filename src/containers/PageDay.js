import "../assets/css/PageDay.css";

export default function PageDay() {
  return (
    <div className="page-day">
      <div className="day-card">
        <div className="day-left">
          <h1>Miércoles</h1>
          <p className="big-temp">10°</p>
          <p>Parcialmente nublado · Sensación 9°</p>
        </div>
        <div className="day-right">
          <img src="" alt="icon" style={{ width: 96, height: 96 }} />
          <div>
            <p>Humedad: 78%</p>
            <p>Índice UV: 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
