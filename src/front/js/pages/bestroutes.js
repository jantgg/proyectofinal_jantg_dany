import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import SliderPhotos from "../component/sliderphotos.js";
import "../../styles/forall.css";
import Maps from "../component/maps";

export const Bestroutes = () => {
  const { store, actions } = useContext(Context);
  const [routes, setRoutes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [singlevision, setSinglevision] = useState(false);
  const [singleroute, setSingleRoute] = useState({});
  const [selectedRouteImages, setSelectedRouteImages] = useState([]);
  const routeImages = selectedRouteImages.map((obj) => obj.url);
  const [routesNewPhotos, setRoutesNewPhotos] = useState([]);
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
      user_id: route.user_id,
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

  const uploadSinglePhotos = async () => {
    const formData = new FormData();
    for (let i = 0; i < routesNewPhotos.length; i++) {
      formData.append("files", routesNewPhotos[i]);
    }
    formData.append("upload_type", "single_photo");
    formData.append("photo_type", "route");
    formData.append("route_id", singleroute.id);

    const response = await fetch(store.backendurl + "photos", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      getPhotos(singleroute.id);
    } else {
      console.log(response);
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
              {store.userType == "User" || store.userType == "Photographer" ? (
                <div>
                  <div className="text-white">
                    Quieres añadir mas fotos a esta ruta ?
                  </div>
                  <input
                    onChange={(e) => {
                      setRoutesNewPhotos(e.target.files);
                    }}
                    type="file"
                    accept="image/jpeg, image/png"
                    multiple
                  />
                  <button
                    onClick={() => {
                      uploadSinglePhotos();
                    }}
                  >
                    Publicar
                  </button>
                </div>
              ) : null}
              <Maps
                origin={mapProps.origin}
                destination={mapProps.destination}
              />
              <SliderPhotos data={routeImages} groupSize={3} />
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
