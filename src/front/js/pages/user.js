import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/prueba.css";

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
          <div key="bikes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="cards-wrapper">
                    <div className="card">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere
                        </a>
                      </div>
                    </div>
                    <div className="card d-none d-md-block">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere
                        </a>
                      </div>
                    </div>
                    <div className="card d-none d-md-block">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="cards-wrapper">
                    <div className="card">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere2
                        </a>
                      </div>
                    </div>
                    <div className="card d-none d-md-block">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere2
                        </a>
                      </div>
                    </div>
                    <div className="card d-none d-md-block">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere2
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="cards-wrapper">
                    <div className="card">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere3
                        </a>
                      </div>
                    </div>
                    <div className="card d-none d-md-block">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere3
                        </a>
                      </div>
                    </div>
                    <div className="card d-none d-md-block">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere3
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
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
