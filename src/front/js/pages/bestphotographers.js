import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardRoutes } from "../component/cardroutes";
import { PhotographerSlider } from "../component/photographerslider";
import "../../styles/forall.css";

export const Bestphotographers = () => {
  const { store, actions } = useContext(Context);
  const [photographers, setPhotographers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [singlevision, setSinglevision] = useState(false);
  const [singlephotographer, setSinglePhotographer] = useState({});

  useEffect(() => {
    getPhotographers();
  }, []);

  useEffect(() => {
    getPhotos();
  }, [singlephotographer]);

  const getPhotographers = async () => {
    await actions.getPhotographers();
    setPhotographers(store.photographers);
  };

  const getPhotos = async () => {
    await actions.getPhotos();
    setPhotos(
      store.photos.filter((obj) => obj.name == singlephotographer.email)
    );
  };

  const AddFavoritePhotographer = async () => {
    const response = await fetch(store.backendurl + "favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        favorite_id: singlephotographer.id,
        favorite_type: "photographer",
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
      <h1 className="text-success">//Los mejores fotografos</h1>
      {photographers.map((photographer) => {
        return (
          <div key={photographer.id}>
            <h4 className="text-white">Fotografo: {photographer.user_name}</h4>
            <button
              onClick={() => {
                setSinglevision(true);
                setSinglePhotographer(photographer);
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
              <h5>Detalles fotografo: </h5>
              <ul>
                <li>Nombre de usuario {singlephotographer.user_name}</li>
                <li>Localizacion: {singlephotographer.location_text}</li>
                <li>Instagram {singlephotographer.instagram}</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Servicios: {singlephotographer.services_text}</li>
                <li>
                  Me puedes encontrar en: {singlephotographer.find_me_text}
                </li>
              </ul>
              {store.userType == "User" || store.userType == "Photographer" ? (
                <button onClick={() => AddFavoritePhotographer()}>
                  <span>♥</span>
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
      <PhotographerSlider images={photos} />
    </div>
  );
};
