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
            </div>
          </div>
        </>
      ) : null}
      <Slider />
    </div>
  );
};
