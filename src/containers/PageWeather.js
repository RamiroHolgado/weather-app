import React, { useState, useEffect, useRef } from "react";

import "../assets/css/PageWeather.css";
import Today from "../components/Today";
import Hours from "../components/Hours";
import FiveDays from "../components/FiveDays";

export default function PageWeather(props) {
  const [weather, setWeather] = useState({});
  const lastCoordsRef = useRef(null);
  const abortRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (!props.coords || !props.coords.length) return;

    const lat = props.coords[0].lat;
    const lon = props.coords[0].lon;

    // evita fetch si coords no cambiaron y no se pidió refresh
    if (
      lastCoordsRef.current &&
      lastCoordsRef.current.lat === lat &&
      lastCoordsRef.current.lon === lon &&
      refreshCount === 0
    ) {
      return;
    }

    // cancela petición anterior
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=e13a4de7d97c9fd3717863271561b6a6`;
    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((result) => {
        lastCoordsRef.current = { lat, lon };
        setWeather(result);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.log("weather fetch error", err);
      })
      .finally(() => {
        setLoading(false);
        setRefreshCount(0);
      });

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [props.coords, refreshCount]);

  return (
    <div className="weather-page">
      {typeof weather.list !== "undefined" ? (
        <>
          <header className="weather-header top-header">
            <div className="location">
              <h2>{weather.city?.name}</h2>
              <p className="country">{weather.city?.country}</p>
            </div>
            <div className="controls">
              <button
                className="btn btn-sm btn-refresh"
                onClick={() => setRefreshCount((c) => c + 1)}
                aria-label="Actualizar pronóstico"
              >
                {loading ? "Cargando..." : "Actualizar"}
              </button>
            </div>
          </header>

          <div className="weather-grid container-fluid home-card fade-in">
            <main className="weather-main">
              <section className="today-card card shadow-sm">
                <Today weather={weather.list[0]} city={weather.city} />
              </section>

              <section className="hours-card card shadow-sm">
                <h5 className="section-title">Próximas horas</h5>
                <div className="hours-scroll">
                  {loading && !weather.list ? (
                    <div className="hours-skeleton">
                      <div className="hour-skel" />
                      <div className="hour-skel" />
                      <div className="hour-skel" />
                    </div>
                  ) : (
                    <Hours list={weather.list} />
                  )}
                </div>
              </section>

              <section className="five-days-card card shadow-sm">
                <h5 className="section-title">Pronóstico 5 días</h5>
                <FiveDays list={weather.list} />
              </section>
            </main>
          </div>
        </>
      ) : (
        <div className="weather-empty">
          <p>No hay datos para mostrar.</p>
        </div>
      )}
    </div>
  );
}
