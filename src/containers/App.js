import { useEffect } from "react";
import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Layout from "../components/Layout";
import PageDay from "./PageDay";
import PageHome from "./PageHome";
import PageWeather from "./PageWeather";

function App() {
  const [coords, setCoords] = useState({});
  console.log(coords);
  useEffect(() => {}, []);
  return (
    <>
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
