import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";
import SliderRoute from "../component/sliderroute.js";
import SliderRouteM from "../component/sliderroutem.js";
import SliderPhotos from "../component/sliderphotos.js";

export const Bestroutesupload = () => {
  const { store, actions } = useContext(Context);
  const [userRoutes, setUserRoutes] = useState([]);
  const [routeName, setRouteName] = useState([]);
  const [startName, setStartName] = useState([]);
  const [interest, setInterest] = useState([]);
  const [endName, setEndName] = useState([]);
  const [photos, setRoutePhoto] = useState([]);
  const [routeSend, setRouteSend] = useState(false);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const isDesktop = window.innerWidth >= 1000;

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
        email: localStorage.getItem("email"),
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

  const inputRoutePhotos = (event) => {
    const selectedFiles = event.target.files;
    const urls = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const url = URL.createObjectURL(selectedFiles[i]);
      urls.push(url);
    }
    setRoutePhoto(selectedFiles);
    setPreviewPhotos(urls);
  };

  return (
    <div className="row">
      <div className="bordecitol heightborder col-8 mx-auto"></div>
      {isDesktop ? (
        <>
          <div className="col-10 mx-auto bordecitoall pb-4 row imagenn">
            <div className="center-align col-3 sizehomet bordecitob mx-auto mb-4 text-white">
              Mis rutas subidas
            </div>{" "}
            <SliderRoute data={userRoutes} groupSize={3} />
          </div>
        </>
      ) : (
        <>
          <div className="col-12 bordecitot bordecitob pb-4 row mx-auto imagenn">
            <div className="center-align col-11 sizehomemb mx-auto mt-4 mb-4">
              Mis rutas subidas
            </div>{" "}
            <SliderRouteM data={userRoutes} groupSize={1} />
          </div>
        </>
      )}
      <div className="bordecitor heightborder col-6 mx-auto"></div>
      {routeSend == false ? (
        <div className="mx-auto col-11 bordecitoall imagenn">
          <div className="text-white mt-5">
            Datos sobre la ruta
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
            <div className="text-white">Descripción</div>
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
            <div className="text-white">Foto</div>
            <input
              onChange={inputRoutePhotos}
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
          <div className="heightborder"></div>
          <div className="row  mx-auto py-3">
            {" "}
            <div className="mx-auto col-11 col-xxl-4 col-xl-4 col-lg-4 center-align sizehomet bordecitob text-white">
              Nuevas fotos
            </div>
            <SliderPhotos data={previewPhotos} groupSize={3} />
          </div>
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
    </div>
  );
};
