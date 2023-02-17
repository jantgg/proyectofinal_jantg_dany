import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const User = () => {
  const { store, actions } = useContext(Context);
  const [userFavoriteBikes, setUserFavoriteBikes] = useState([]);
  const [userFavoriteRoutes, setUserFavoriteRoutes] = useState([]);
  const [userPhotographers, setUserFavoritePhotographers] = useState([]);
  const [pPhotos, setPPhoto] = useState([]);
  const [currentPhotographer, setCurrentPhotographer] = useState();

  useEffect(() => {
    getFavorites();
    getCurrentPhotographer();
  }, []);

  const getCurrentPhotographer = async () => {
    await actions.getPhotographers();
    const photographer = store.photographers.find((obj) => obj.email === localStorage.getItem("email"));
    setCurrentPhotographer(photographer);
   // setPPhoto(currentPhotographer.photos)
  };


  const getFavorites = async () => {
    await actions.getFavorites();
    console.log(store.favorites);
    setUserFavoriteBikes(store.favorites.filter((obj) => obj.bike != null));
    setUserFavoriteRoutes(store.favorites.filter((obj) => obj.route != null));
    setUserFavoritePhotographers(
      store.favorites.filter((obj) => obj.photographer != null)
    );
  };

  return (
    <div className="row text-white">
      {store.userType == "user" ? (
        <>
          <div key="bikes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            Hola
          </div>
          <div key="routes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            routes
          </div>
          <div key="photographers @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            photographers
          </div>
        </>
      ) : (
        <>
          <div key="photos @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            photos
          </div>
        </>
      )}
    </div>
  );
};
