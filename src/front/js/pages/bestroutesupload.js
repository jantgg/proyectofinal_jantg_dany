import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";
import "../../styles/login.css";
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
  const [previewPhotos, setPreviewPhotos] = useState(null);
  const isDesktop = window.innerWidth >= 1000;

  useEffect(() => {
    getFavorites();
    getUserRoutes();
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
    formData.append("upload_type", "route");
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
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      console.log(response.data);
      8;
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

  const getUserRoutes = async () => {
    const response = await fetch(store.backendurl + "userroutes", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUserRoutes(data.body);
    } else {
      console.log("response not ok");
    }
  };

  return (
    <div className="row">
      <div className="bordecitol heightborder col-8 mx-auto"></div>
      {isDesktop ? (
        <>
          <div className="col-10 mx-auto bordecitoall pb-4 row imagenn">
            <div className="center-align col-12 col-xxl-5 col-xl-6 col-lg-7 sizehomet bordecitob mx-auto mb-4 text-white">
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
          <p className="bordecito col-12 col-xxl-5 col-xl-6 col-lg-7 mx-auto sizehomet mt-3 mb-2 text-white center-align">
            Datos sobre la nueva ruta
          </p>
          <div
            className="login-box col-11 col-xxl-4 col-xl-5 col-lg-6 text-white mx-auto m-3 center-align sizehomes bordecitoall px-5 p-3"
            style={{ backgroundColor: "black" }}
          >
            <form
              onSubmit={() => {
                e.prevent.default();
              }}
            >
              <div className="user-box">
                <input
                  type="name"
                  name="name"
                  required
                  autoFocus
                  onChange={(e) => {
                    setRouteName(e.target.value);
                  }}
                ></input>
                <label htmlFor="name">Nombre de la ruta</label>
              </div>

              <div className="user-box">
                <input
                  type="start"
                  name="start"
                  required
                  autoFocus
                  onChange={(e) => {
                    setStartName(e.target.value);
                  }}
                ></input>
                <label htmlFor="start">Sitio de salida</label>
              </div>

              <div className="user-box">
                <input
                  type="description"
                  name="description"
                  required
                  autoFocus
                  onChange={(e) => {
                    setInterest(e.target.value);
                  }}
                ></input>
                <label htmlFor="description">Descripción</label>
              </div>

              <div className="user-box">
                <input
                  type="end"
                  name="end"
                  required
                  autoFocus
                  onChange={(e) => {
                    setEndName(e.target.value);
                  }}
                ></input>
                <label htmlFor="end">Fin de la ruta</label>
              </div>
              <div className="user-box mt-3">
                <input
                  onChange={inputRoutePhotos}
                  type="file"
                  accept="image/jpeg, image/png"
                  multiple
                />
                <label htmlFor="photo">Fotos de la ruta</label>
              </div>
            </form>
            <button
              className="botonaco mb-5 sizehomes px-3"
              onClick={() => {
                uploadPhoto();
              }}
            >
              <span style={{ "--i": 1 }}>P</span>
              <span style={{ "--i": 2 }}>u</span>
              <span style={{ "--i": 3 }}>b</span>
              <span style={{ "--i": 4 }}>l</span>
              <span style={{ "--i": 5 }}>i</span>
              <span style={{ "--i": 6 }}>c</span>
              <span style={{ "--i": 7 }}>a</span>
              <span style={{ "--i": 8 }}>r</span>
              <span style={{ "--i": 9 }}>&nbsp;</span>
              <span style={{ "--i": 10 }}>r</span>
              <span style={{ "--i": 11 }}>u</span>
              <span style={{ "--i": 12 }}>t</span>
              <span style={{ "--i": 13 }}>a</span>
            </button>
          </div>

          {previewPhotos != null ? (
            <div className="row mt-3 mx-auto py-3">
              {" "}
              <div className="mx-auto col-11 col-xxl-4 col-xl-4 col-lg-4 center-align sizehomet text-white mb-3">
                Nuevas fotos
              </div>
              <SliderPhotos data={previewPhotos} groupSize={3} />
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <div className="text-white"> Route send succesfully!</div>
          <button
            onClick={() => {
              setRouteSend(false);
            }}
          >
            Click Here to upgrade another 1
          </button>
        </div>
      )}
    </div>
  );
};
