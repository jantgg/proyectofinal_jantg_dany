import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardRoutes } from "../component/cardroutes";
import { Slider } from "../component/slider";
import "../../styles/home.css";

export const Bestroutes = () => {
  const { store, actions } = useContext(Context);
  const [routes, setRoutes] = useState([]);
  const [singlevision, setSinglevision] = useState(false);
  const [singleroute, setSingleRoute] = useState({});

  useEffect(() => {
    getRoutes();
  }, []);

  const getRoutes = async () => {
    await actions.getRoutes();
    setRoutes(store.routes);
  };

  const AddFavoriteRoute = async () => {
    const response = await fetch(store.backendurl + "favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        favorite_id: singleroute.id,
        favorite_type: "route",
      }),
    });
    if (response.ok) {
      console.log("response ok");
    } else {
      console.log("response not ok");
    }
  };

  return (
    <div className="container">
      <h1 className="text-success">//Las mejores rutas</h1>
      {routes.map((route) => {
        return (
          <div key={route.id}>
            <h4 className="text-white">Nombre ruta: {route.name}</h4>
            <button
              onClick={() => {
                setSinglevision(true);
                setSingleRoute(route);
              }}
            >
              <span>Ver detalles</span>
            </button>
            {store.userType != "user" && store.userType != "photographer" ? (
              <div className="col-4 mx-auto text-center mb-5  fs-3 text-wrap lh-sm border border-danger rounded pb-2">
                No vas a poder guardar los resultados en favoritos ya que no te
                has registrado
              </div>
            ) : null}
          </div>
        );
      })}
      {singlevision == true ? (
        <>
          <div className="text-white">
            <div>
              <h5>Coordenadas mapa ruta:</h5>
              <ul>
                <li>Punto de partida: {singleroute.start_location_name}</li>
                <li>Puntos de interes: {singleroute.interest_text}</li>
                <li>Fin de la ruta: {singleroute.end_location_name}</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Start latitude {singleroute.start_latitude}</li>
                <li>Start longitude: {singleroute.start_longitude}</li>
                <li>End latitude: {singleroute.end_latitude}</li>
                <li>End longitude: {singleroute.end_longitude}</li>
              </ul>
              {store.userType == "user" || store.userType == "photographer" ? (
                <button onClick={() => AddFavoriteRoute()}>
                  <span>♥</span>
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
      <Slider />
    </div>
  );
};
