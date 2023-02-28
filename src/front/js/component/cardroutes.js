import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const CardRoutes = ({
  id,
  name,
  interest_text,
  start_location_name,
  start_latitude,
  start_longitude,
  end_location_name,
  end_latitude,
  end_longitude,
}) => {
  return (
    <>
      <div key={id} className="text-white">
        <div>
          <h4>Nombre ruta : {name}</h4>
          <h5>Coordenadas mapa ruta:</h5>
          <ul>
            <li>Start latitude {start_latitude}</li>
            <li>Start longitude: {start_longitude}</li>
            <li>End latitude: {end_latitude}</li>
            <li>End longitude: {end_longitude}</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Punto de partida: {start_location_name}</li>
            <li>Puntos de interes: {interest_text}</li>
            <li>Fin de la ruta: {end_location_name}</li>
          </ul>
        </div>
      </div>
    </>
  );
};
