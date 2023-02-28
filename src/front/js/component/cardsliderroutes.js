import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const CardSliderRoutes = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="card text-bg-dark col-lg-6 col-md-8 col-sm-10 col-xs-11 mx-auto">
          <img src="" className="card-img" alt="..." />
          <div className="card-img-overlay mx-auto">
            <div className="mx-auto">
              <h5 className="mx-auto">Nombre</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
