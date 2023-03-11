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
  const [selectedRouteImages, setSelectedRouteImages] = useState([]);
  const [mapProps, setMapProps] = useState({
    origin: "",
    destination: "",
  });

  useEffect(() => {
    getRoutes();
  }, []);

  useEffect(() => {
    getPhotos(singleroute.id);
  }, [singleroute]);

  useEffect(() => {
    setMapProps({
      origin: singleroute.start_location_name,
      destination: singleroute.end_location_name,
    });
  }, [singleroute.start_location_name, singleroute.end_location_name]);

  const getPhotos = async (routeId) => {
    const selectedRoute = routes.find((route) => route.id === routeId);
    if (selectedRoute) {
      setSelectedRouteImages(selectedRoute.photos);
    }
  };

  const getRoutes = async () => {
    const response = await fetch(store.backendurl + "routes");
    const data = await response.json();
    const routesWithPhotos = data.body.map((route) => ({
      ...route,
      photos: route.photos.map((photo) => ({
        id: photo.id,
        url: photo.path,
      })),
    }));
    setRoutes(routesWithPhotos);
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

      <Maps origin={mapProps.origin} destination={mapProps.destination} />

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
                if (singlevision == true) {
                  setSinglevision(false);
                }
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
              <div className="text-white">
                Quieres añadir mas fotos a esta ruta ?
              </div>
              <input
                onChange={(e) => {
                  setRoutePhoto(e.target.files);
                }}
                type="file"
                accept="image/jpeg, image/png"
                multiple
              />
              <button
                onClick={() => {
                  uploadPhoto();
                }}
              >
                Publicar
              </button>
              <RoutesSlider images={selectedRouteImages} />
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
    </div>
  );
};
