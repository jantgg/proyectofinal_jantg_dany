import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Result = () => {
  const { store, actions } = useContext(Context);
  const [bikesResults, setBikesResults] = useState();
  useEffect(() => {
    actions.getBikes();
    setBikesResults(store.bikes);
  }, []);
  console.log(store.bikes);
  console.log(bikesResults);
  return (
    <div className="row">
      <div
        id="carouselExampleIndicators"
        className="carousel slide col-12 mx-auto"
        data-bs-ride="true"
      >
        <div
          key="carousel indicators @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
          className="carousel-indicators"
        >
          {bikesResults.map((bike, index) => {
            let number = index;
            let bikeinfo = bike;
            return (
              <>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={number}
                  className={number == 0 ? "active" : ""}
                  aria-current={number == 0 ? "true" : ""}
                  aria-label={`Slide ${number + 1}`}
                ></button>
              </>
            );
          })}
        </div>
        <div className="carousel-inner">
          {bikesResults.map((bike, index) => {
            let number = index;
            let bikeinfo = bike;
            return (
              <>
                <div
                  className={
                    number == 0 ? "carousel-item active" : "carousel-item"
                  }
                >
                  <div
                    key="card @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
                    className="container"
                  >
                    <div className="row">
                      <div className="card text-bg-dark col-lg-6 col-md-8 col-sm-10 col-xs-11 mx-auto">
                        <img
                          src={bike.bike_photo}
                          className="card-img"
                          alt="..."
                        />
                        <div className="card-img-overlay mx-auto">
                          <div className="mx-auto">
                            <h5 className="mx-auto">{bike.model}</h5>
                            <p className="">Pedazo pepino e o no</p>
                            <p className="">
                              <small>{bike.ask_6_price}</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
