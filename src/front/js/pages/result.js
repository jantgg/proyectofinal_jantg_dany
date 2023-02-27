import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Result = () => {
  const { store, actions } = useContext(Context);
  const [bikesResults, setBikesResults] = useState([]);

  useEffect(() => {
    getBikes();
  }, []);

  const getBikes = async () => {
    await actions.getBikes();
    setBikesResults(
      store.bikes
      // store.bikes.map((obj) => {
      //   if (obj.current_question_id == currentQuestion) {
      //     return obj;
      //   }
      // })
    );
  };

  const addFavoriteBike = async () => {
    const response = await fetch(store.backendurl + "favorite", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: email,
        favorite_id: bike.id,
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
      key="losresultados @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      className="row revealUp"
    >
      <div className="col-12 mx-auto  text-white">
        {store.userType != "user" && store.userType != "photographer" ? (
          <div className="col-4 mx-auto text-center mb-5  fs-3 text-wrap lh-sm border border-danger rounded pb-2">
            No vas a poder guardar los resultados en favoritos ya que no te has
            registrado
          </div>
        ) : null}
        <div className="col-8 mx-auto text-center mt-5 fs-1 text-wrap lh-sm border border-danger">
          //Estas son las mejores motos que hemos encontrado especialmente para
          ti
        </div>
      </div>
      <div
        key="slider @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
        className="col-12 border border-danger"
      >
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
                              {store.userType == "user" ||
                              store.userType == "photographer" ? (
                                <button
                                  className=""
                                  onClick={() => addFavoriteBike()}
                                >
                                  Favorite
                                </button>
                              ) : null}
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
      <div className="col-12 mx-auto  text-white text-center">
        <div className="col-8 mx-auto text-center mt-5 fs-1 text-wrap lh-sm border border-danger">
          Todas estas motos están elegidas en función de como has respondido a
          las preguntas, si quieres volver a realizar el test pincha aqui. ¡No
          olvides guardar en favoritos las motos que mas te hayan gustado para
          poder revisarlas mas adelante!
        </div>
        <div className="">
          <button
            className="botonaco"
            onClick={() => {
              setCurrentQuestion("q1");
            }}
          >
            <span>REPETIR TEST</span>
          </button>
        </div>
      </div>
    </div>
  );
};
