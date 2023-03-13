import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/result.css";
import "../../styles/forall.css";
import SliderBike from "../component/sliderbike.js";
import SliderBikeM from "../component/sliderbikem.js";
import SliderRoute from "../component/sliderroute.js";
import SliderRouteM from "../component/sliderroutem.js";

export const User = () => {
  const { store, actions } = useContext(Context);
  const [userFavBikes, setUserFavBikes] = useState([]);
  const bikes = userFavBikes.map((obj) => obj.bike);
  const [userFavRoutes, setUserFavRoutes] = useState([]);
  const routes = userFavRoutes.map((obj) => obj.route);
  const [userFavPhotographers, setUserFavPhotographers] = useState([]);
  const photographers = userFavPhotographers.map((obj) => obj.photographer);
  const [pPhotos, setPPhoto] = useState([]);
  const [currentPhotographer, setCurrentPhotographer] = useState();
  const isDesktop = window.innerWidth >= 1000;

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

  const userName = localStorage.getItem("user_name");

  const getFavorites = async () => {
    await actions.getFavorites();
    console.log(store.favorites);
    setUserFavBikes(store.favorites.filter((obj) => obj.bike != null));
    setUserFavRoutes(store.favorites.filter((obj) => obj.route != null));
    setUserFavPhotographers(
      store.favorites.filter((obj) => obj.photographer != null)
    );
  };

  return (
    <div className="row text-white">
      {store.userType == "User" ? (
        <>
          <div className="col-9 mx-auto bordecitor ">
            <div className="right-align sizehome mb-2 me-4">{userName}</div>
          </div>

          {isDesktop ? (
            <>
              <div className="col-12 bordecitoall pb-4 row mx-auto imagenn">
                <div className="center-align col-3 sizehomet bordecitob mx-auto mb-4">
                  Mis motos favoritas
                </div>{" "}
                <SliderBike data={bikes} groupSize={3} />
              </div>
            </>
          ) : (
            <>
              <div className="col-12 bordecitot bordecitob pb-4 row mx-auto imagenn">
                <div className="center-align col-11 sizehomemb mx-auto mt-4 mb-4">
                  Mis motos favoritas
                </div>{" "}
                <SliderBikeM data={bikes} groupSize={1} />
              </div>
            </>
          )}
          <div className="col-9 mx-auto heightborder bordecitol "></div>
          {isDesktop ? (
            <>
              <div className="col-12 bordecitoall pb-4 row imagenn">
                <div className="center-align col-3 sizehomet bordecitob mx-auto mb-4">
                  Mis rutas favoritas
                </div>{" "}
                <SliderRoute data={routes} groupSize={3} />
                <div className="center-align sizehomet mt-3 ">
                  <Link to="/bestroutesupload">
                    <button className="botonaco mx-auto px-4">
                      <span style={{ "--i": 1 }}>S</span>
                      <span style={{ "--i": 2 }}>u</span>
                      <span style={{ "--i": 3 }}>b</span>
                      <span style={{ "--i": 4 }}>i</span>
                      <span style={{ "--i": 5 }}>r</span>
                      <span style={{ "--i": 6 }}>&nbsp;</span>
                      <span style={{ "--i": 7 }}>m</span>
                      <span style={{ "--i": 8 }}>i</span>
                      <span style={{ "--i": 9 }}>&nbsp;</span>
                      <span style={{ "--i": 10 }}>r</span>
                      <span style={{ "--i": 11 }}>u</span>
                      <span style={{ "--i": 12 }}>t</span>
                      <span style={{ "--i": 13 }}>a</span>
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-12 bordecitot bordecitob pb-4 row mx-auto imagenn">
                <div className="center-align col-11 sizehomemb mx-auto mt-4 mb-4">
                  Mis rutas favoritas
                </div>{" "}
                <SliderRouteM data={routes} groupSize={1} />
                <div className="center-align sizehomet mt-3 ">
                  <Link to="/bestroutesupload">
                    <button className="botonaco mx-auto px-4">
                      <span style={{ "--i": 1 }}>S</span>
                      <span style={{ "--i": 2 }}>u</span>
                      <span style={{ "--i": 3 }}>b</span>
                      <span style={{ "--i": 4 }}>i</span>
                      <span style={{ "--i": 5 }}>r</span>
                      <span style={{ "--i": 6 }}>&nbsp;</span>
                      <span style={{ "--i": 7 }}>m</span>
                      <span style={{ "--i": 8 }}>i</span>
                      <span style={{ "--i": 9 }}>&nbsp;</span>
                      <span style={{ "--i": 10 }}>r</span>
                      <span style={{ "--i": 11 }}>u</span>
                      <span style={{ "--i": 12 }}>t</span>
                      <span style={{ "--i": 13 }}>a</span>
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
          <div key="photographers @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            {userFavPhotographers.map(() => {
              return <p>Un Fotografo</p>;
            })}
          </div>
        </>
      ) : store.userType == "Photographer" ? (
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
      ) : null}
    </div>
  );
};
