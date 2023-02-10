import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Card = () => {
  return (
    <div
      key="card @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      className="container"
    >
      <div className="row">
        <div className="card text-bg-dark col-lg-6 col-md-8 col-sm-10 col-xs-11 mx-auto">
          <img
            src="https://images.ctfassets.net/x7j9qwvpvr5s/71mJKMrZ5FOEiSaXSjD8gt/38805096fbaee8b60cd3777dec390187/Ducati-Diavel-V4-MY23-overview-gallery-906x510-01.jpg?fm=webp&q=90"
            className="card-img"
            alt="..."
          />
          <div className="card-img-overlay mx-auto">
            <div className="mx-auto">
              <h5 className="mx-auto">Ducati Diavel 4S</h5>
              <p className="">Pedazo pepino e o no</p>
              <p className="">
                <small>30.000$</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
