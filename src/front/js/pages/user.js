import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";

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

  useEffect(() => {
    getPhotos();
  }, [currentPhotographer]);

  const getPhotos = async () => {
    await actions.getPhotos();
    setPPhoto(
      store.photos.filter((obj) => obj.name == currentPhotographer.email)
    );
  };

  const getCurrentPhotographer = async () => {
    await actions.getPhotographers();
    const photographer = store.photographers.find(
      (obj) => obj.email === localStorage.getItem("email")
    );
    setCurrentPhotographer(photographer);
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
          <div>User</div>
          <div>
            <Link to="/bestroutesupload">
              <button className="btn btn-primary">Upload Route</button>
            </Link>
          </div>
          <div key="bikes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            {userFavoriteBikes.map(() => {
              return <p>Una Moto</p>;
            })}
          </div>
          <div key="routes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            {userFavoriteRoutes.map(() => {
              return <p>Una Ruta</p>;
            })}
          </div>
          <div key="photographers @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            {userPhotographers.map(() => {
              return <p>Un Fotografo</p>;
            })}
          </div>
        </>
      ) : (
        <>
          <div>Photographer</div>
          <div>
            <Link to="//bestphotographerupload">
              <button className="btn btn-primary">Upload Service</button>
            </Link>
          </div>
          <div key="photos @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            {pPhotos.map((photos) => {
              return <p>Un Fotografo</p>;
            })}
          </div>
        </>
      )}
    </div>
  );
};
