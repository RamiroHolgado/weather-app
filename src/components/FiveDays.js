import Day from "./Day";

export default function FiveDays({ list }) {
  if (!list || !list.length) return null;

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const groups = {};
  list.forEach((item) => {
    const date = item.dt_txt.slice(0, 10);
    if (!groups[date]) {
      groups[date] = {
        max: item.main.temp_max,
        min: item.main.temp_min,
        icon: item.weather?.[0]?.icon,
      };
    } else {
      groups[date].max = Math.max(groups[date].max, item.main.temp_max);
      groups[date].min = Math.min(groups[date].min, item.main.temp_min);
      // prefer midday icon if available
      const hour = parseInt(item.dt_txt.slice(11, 13), 10);
      if (hour >= 11 && hour <= 13) groups[date].icon = item.weather?.[0]?.icon;
    }
  });

  const dates = Object.keys(groups).slice(0, 5);

  return (
    <div className="five-days-list">
      {dates.map((d, i) => {
        const info = groups[d];
        const dayName = days[new Date(d).getDay()];
        return (
          <Day
            key={d}
            day={dayName}
            icon={info.icon}
            max={info.max}
            min={info.min}
          />
        );
      })}
    </div>
  );
}
