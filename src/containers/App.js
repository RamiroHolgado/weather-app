import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Layout from "../components/Layout";
import PageDay from "./PageDay";
import PageHome from "./PageHome";
import PageWeather from "./PageWeather";

function App() {
  const [coords, setCoords] = useState(() => {
    try {
      const stored = localStorage.getItem("coords");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("coords", JSON.stringify(coords));
    } catch (e) {}
  }, [coords]);
  console.log("app ", coords);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch (e) {
      return "dark";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };
  return (
    <>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={
          theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
        }
      >
        {theme === "light" ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/weather"
            element={<PageWeather coords={coords} />}
          ></Route>
          <Route exact path="/day" element={<PageDay />}></Route>
          <Route
            exact
            path="/"
            element={<PageHome coords={coords} setCoords={setCoords} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
