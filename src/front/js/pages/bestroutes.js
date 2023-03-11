import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { RoutesSlider } from "../component/routesslider";
import "../../styles/forall.css";
import Maps from "../component/maps";
import Map from "../component/mymap";

export const Bestroutes = () => {
  const { store, actions } = useContext(Context);
  const [routes, setRoutes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [singlevision, setSinglevision] = useState(false);
  const [singleroute, setSingleRoute] = useState({});
  const [mapProps, setMapProps] = useState({
    origin: "",
    destination: "",
  });

  useEffect(() => {
    getRoutes();
  }, []);

  useEffect(() => {
    getPhotos();
  }, [singleroute]);

  useEffect(() => {
    setMapProps({
      origin: singleroute.start_location_name,
      destination: singleroute.end_location_name,
    });
  }, [singleroute.start_location_name, singleroute.end_location_name]);

  const getPhotos = async () => {
    await actions.getPhotos();
    setPhotos(store.photos.filter((obj) => obj.name == singleroute.name));
  };

  const getRoutes = async () => {
    await actions.getRoutes();
    setRoutes(store.routes);
  };

  const addFavoriteRoute = async () => {
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
      <Map data={routes}></Map>
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
            {store.userType != "User" && store.userType != "Photographer" ? (
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
              <ul>
                <li>Punto de partida: {singleroute.start_location_name}</li>
                <li>Fin de la ruta: {singleroute.end_location_name}</li>
                <li>Puntos de interes: {singleroute.interest_text}</li>
              </ul>
              <Maps
                origin={mapProps.origin}
                destination={mapProps.destination}
              />
            </div>
            <div>
              {store.userType == "User" || store.userType == "Photographer" ? (
                <button onClick={() => addFavoriteRoute()}>
                  <span>♥</span>
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
      <RoutesSlider images={photos} />
    </div>
  );
};
