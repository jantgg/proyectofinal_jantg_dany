import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const User = () => {
  const { store, actions } = useContext(Context);
  const [userFavoriteBikes, setUserFavoriteBikes] = useState([]);
  const [userFavoriteRoutes, setUserFavouserFavoriteRoutes] = useState([]);
  const [userPhotographers, setUserPhotographers] = useState([]);

  const [pPhotos, setPPhoto] = useState([]);

  return (
    <div className="row ">
      {store.userType == "user" ? (
        <>
          <div key="bikes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"></div>
          <div key="routes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"></div>
          <div key="photographers @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"></div>
        </>
      ) : (
        <>
          <div></div>
        </>
      )}
    </div>
  );
};
