import React, { useState, useContext } from "react";
import "../../styles/sliderbueno.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Routecard = ({ route, index }) => {
  const { store, actions } = useContext(Context);

  const deleteFavoriteRoute = async () => {
    const response = await fetch(store.backendurl + "favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        bike_id: route.id,
        favorite_type: "route",
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
        backgroundImage: `url(${route.photos[0].path})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="imagen">
        <div className="free">
          <div className="headcontent bordecitoall bg-black">
            <div className="sizehomet spartan text-center">{route.name}</div>
          </div>
        </div>

        <div className="content bordecitoup col-12 container d-flex flex-column justify-content-between">
          <div className="ms-3 sizehomes center-align">
            {route.interest_text}
          </div>
          <div className="right-align mb-3 w100">
            <button
              key="button"
              className="botonaco zup px-2 sizehomes center-align"
              onClick={() => deleteFavoriteRoute()}
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

export default Routecard;
