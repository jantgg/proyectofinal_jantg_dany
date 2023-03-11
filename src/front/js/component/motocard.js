import React, { useState, useContext } from "react";
import "../../styles/sliderbueno.css";
import "../../styles/favbutton.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Motocard = ({ bike, index }) => {
  const { store, actions } = useContext(Context);

  return (
    <div
      key={index}
      className=" motocard colp text-white bordecitoall mx-auto"
      style={{ backgroundImage: `url(${bike.bike_photo})` }}
    >
      <div className="imagen">
        <div className="free">
          <div className="headcontent bordecitoall bg-black">
            <div className="sizehomet spartan text-center">{bike.model}</div>
          </div>
        </div>

        <div className="content bordecitoup col-12 container d-flex flex-column justify-content-between">
          <div className="ms-3 sizehomes center-align">
            Hola esto es el texto emergente
          </div>
          <div className="right-align mb-3 w100">
            {store.userType == "User" || store.userType == "photographer" ? (
              <button
                key="button"
                className="favbtn sizehomes center-align"
                onClick={() => addFavoriteBike()}
              >
                <span className="mx-auto center-align" style={{ "--i": 1 }}>
                  <i className="fa-regular fa-heart"></i>
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motocard;
