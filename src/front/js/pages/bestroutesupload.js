import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";

export const Bestroutesupload = () => {
  const { store, actions } = useContext(Context);
  const [userFavoriteRoutes, setUserFavoriteRoutes] = useState([]);
  const [routeName, setRouteName] = useState([]);
  const [startName, setStartName] = useState([]);
  const [interest, setInterest] = useState([]);
  const [endName, setEndName] = useState([]);
  const [photos, setRoutePhoto] = useState([]);
  const [routeSend, setRouteSend] = useState(false);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    await actions.getFavorites();
    setUserFavoriteRoutes(store.favorites.filter((obj) => obj.route != null));
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("files", photos[i]);
      }
    }
    formData.append("photo_type", "route");
    formData.append(
      "route_data",
      JSON.stringify({
        name: routeName,
        interest_text: interest,
        start_location_name: startName,
        end_location_name: endName,
      })
    );
    const response = await fetch(store.backendurl + "photos", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      console.log(response.data);
      setRouteSend(true);
    } else {
      console.log(response);
    }
  };

  return (
    <>
      {routeSend == false ? (
        <div className="mx-auto">
          <div>
            <h1 className="text-white">Mis rutas</h1>
            <div className="text-white">
              {userFavoriteRoutes.map((route, index) => {
                return <p key={index}>Una Ruta</p>;
              })}
            </div>
          </div>
          <div className="text-white mt-5">
            Detalles
            <div className="text-white">Nombre de la ruta</div>
            <input
              onChange={(e) => {
                setRouteName(e.target.value);
              }}
            ></input>
            <div className="text-white">Sitio de salida</div>
            <input
              onChange={(e) => {
                setStartName(e.target.value);
              }}
            ></input>
            <div className="text-white">Puntos de interes</div>
            <input
              onChange={(e) => {
                setInterest(e.target.value);
              }}
            ></input>
            <div className="text-white">Fin de la ruta</div>
            <input
              onChange={(e) => {
                setEndName(e.target.value);
              }}
            ></input>
          </div>
          <div className="text-white">Foto</div>
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
        </div>
      ) : (
        <div>
          <div className="text-white"> Route send succesfully!</div>
          <button
            onClick={() => {
              setRouteSend(true);
            }}
          >
            Click Here to upgrade another 1
          </button>
        </div>
      )}
    </>
  );
};
