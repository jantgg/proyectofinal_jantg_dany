import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { CardSliderRoutes } from "./cardsliderroutes";

export const RoutesSlider = ({ images }) => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide col-12 mx-auto"
      data-bs-ride="true"
    >
      <div key="carousel indicators" className="carousel-indicators">
        {images.map((image, index) => {
          let number = index;
          return (
            <div key={`${number + 1}`}>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={number}
                className={number == 0 ? "active" : ""}
                aria-current={number == 0 ? "true" : ""}
                aria-label={`Slide ${number + 1}`}
              ></button>
            </div>
          );
        })}
      </div>
      <div className="carousel-inner">
        {images.map((image) => {
          return (
            <div key={image.id} className="carousel-item active">
              <img src={image.path} />
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
