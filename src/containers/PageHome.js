import React, { useState } from "react";
import "../assets/css/PageHome.css";
import { useNavigate } from "react-router-dom";
function PageHome(props) {
  let history = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  // console.log(busqueda);

  const convertToCoords = async () => {
    await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${busqueda},AR&limit=1&appid=e13a4de7d97c9fd3717863271561b6a6`
    )
      .then((res) => res.json())
      .then((res) => {
        props.setCoords(res);
      })
      .catch((error) => console.log(error));
    console.log("pageHome " + props.coords.lat);
  };

  return (
    <div className="container">
      <div className="row centrado">
        <div className="col-md-6 centrar">
          <form
            className="form-inline"
            onSubmit={() => {
              convertToCoords();
              history(`/weather`);
            }}
            name="Form"
          >
            <div className="busqueda">
              <input
                name=""
                type="text"
                id="buscar"
                placeholder="Ciudad"
                value={props.busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                }}
              />
            </div>
          </form>
          <div className="actions">
            <button
              className="btng"
              type="submit"
              onClick={() => {
                convertToCoords();
                history(`/weather`);
              }}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHome;
