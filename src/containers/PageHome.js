import React, { useState } from "react";
import "../assets/css/PageHome.css";
import { useNavigate } from "react-router-dom";
const apiKey = process.env.REACT_APP_API_KEY;

function PageHome(props) {
  const history = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  const convertToCoords = async () => {
    if (loading || !busqueda) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${busqueda}&limit=1&appid=${apiKey}`,
      ).then((r) => r.json());
      props.setCoords(res);
    } catch (error) {
      console.log("error" + error);
    }
    setLoading(false);
  };

  return (
    <div className="home-hero">
      <div className="home-card container">
        <div className="home-left">
          <h1>Clima ahora</h1>
          <p className="muted">
            Busca la ciudad para ver el pronóstico detallado
          </p>
        </div>
        <div className="home-right">
          <form
            className="search-form"
            onSubmit={async (e) => {
              e.preventDefault();
              await convertToCoords();
              history(`/weather`);
            }}
          >
            <div className="search-input">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                ></circle>
              </svg>
              <input
                type="text"
                placeholder="Ciudad, país"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="search-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PageHome;
