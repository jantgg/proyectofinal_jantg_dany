import React, { useState, useContext } from "react";
import "../../styles/sliderbueno.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Motocard = ({ bike, index }) => {
  const { store, actions } = useContext(Context);

  const deleteFavoriteBike = async () => {
    const response = await fetch(store.backendurl + "favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        bike_id: bike.id,
        favorite_type: "bike",
      }),
    });
    if (response.ok) {
      console.log("response ok");
    } else {
      console.log("response not ok");
    }
  };

  return (
    <div
      key={index}
      className=" motocard colp text-white bordecitoall mx-auto"
      style={{
        backgroundImage: `url(${bike.bike_photo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="imagen">
        <div className="free">
          <div className="headcontent bordecitoall bg-black">
            <div className="sizehomet spartan text-center">{bike.model}</div>
          </div>
        </div>

        <div className="content bordecitot col-12 container d-flex flex-column justify-content-between">
          <div className="ms-3 sizehomes center-align">
            Hola esto es el texto emergente
          </div>
          <div className="right-align mb-3 w100">
            <button
              key="button"
              className="botonaco px-2 sizehomes center-align"
              onClick={() => deleteFavoriteBike()}
            >
              <span className="mx-auto center-align" style={{ "--i": 1 }}>
                <i class="fa-solid fa-heart"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motocard;
