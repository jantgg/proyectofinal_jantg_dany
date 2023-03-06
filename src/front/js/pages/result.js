import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/result.css";
import "../../styles/forall.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Result = () => {
  const Navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [bikesResults, setBikesResults] = useState([]);
  const [moreInfo, setMoreInfo] = useState(false);
  const isDesktop = window.innerWidth >= 1000;

  useEffect(() => {
    getBikes();

    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".revealUp").forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 60%",
        end: "bottom 35%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            elem,
            { y: 700, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "power1.out",
              overwrite: "auto",
            }
          );
        },
      });
    });
  }, []);
  //   GetBikes que agarra los resultados del localStorage
  //    const getBikes = async () => {
  //    const bikes = JSON.parse(localStorage.getItem("Results"));
  //    setBikesResults(bikes);
  //    };

  const removeResult = () => {
    localStorage.removeItem("Results");
  };

  const getBikes = async () => {
    await actions.getBikes();
    setBikesResults(store.bikes);
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

  function createArraysOfFour(originalArray) {
    const newArray = [];
    for (let i = 0; i < originalArray.length; i += 4) {
      newArray.push(originalArray.slice(i, i + 4));
    }
    console.log(newArray);
    return newArray;
  }

  const arraysOfFour = createArraysOfFour(bikesResults);

  return (
    <div className="row revealUp">
      <div className="col-12 mx-auto  text-white">
        <div className="bordecitol col-7 mx-auto heightborders"></div>
        <div className="col-10 mx-auto text-center mt-0 bordecitoall sizehomeq py-1 px-3 text-wrap spartan imagen4 text-white">
          <div className="reveal">
            Estas son las mejores motos que hemos encontrado especialmente para
            ti
          </div>
        </div>
      </div>
      {isDesktop ? (
        <div
          key="slider @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
          id="carouselExampleIndicators"
          className="carousel slide col-12 mx-auto altura"
          data-bs-ride="true"
        >
          <div key="carousel indicators" className="carousel-indicators">
            {arraysOfFour.map((array, index) => {
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
            {arraysOfFour.map((array, index) => {
              return (
                <div
                  key={index}
                  className={`col-12 text-white row  carousel-item${
                    index === 0 ? " active" : ""
                  }`}
                >
                  {array.map((bike, index) => {
                    return (
                      <div
                        key={index}
                        className=" motocard col-11 col-xxl-3 col-xl-3 col-lg-4 text-white bordecitoall mx-auto"
                        style={{ backgroundImage: `url(${bike.bike_photo})` }}
                      >
                        <div className="imagen">
                          <div className="free">
                            <div className="headcontent bordecitoall bg-black">
                              <div className="sizehomet spartan text-center">
                                {bike.model}
                              </div>
                            </div>
                          </div>

                          <div className="content bordecitoup col-12 container d-flex flex-column justify-content-between align-items-center">
                            <div className="ms-3 sizehomes">
                              Hola esto es el texto emergente
                            </div>
                            <div className="row mb-3">
                              {store.userType == "User" ||
                              store.userType == "photographer" ? (
                                <button
                                  className="botonfavs sizehomes mx-auto pt-auto"
                                  onClick={() => addFavoriteBike()}
                                >
                                  <span style={{ "--i": 1 }}>A</span>
                                  <span style={{ "--i": 2 }}>ñ</span>
                                  <span style={{ "--i": 3 }}>a</span>
                                  <span style={{ "--i": 4 }}>d</span>
                                  <span style={{ "--i": 5 }}>i</span>
                                  <span style={{ "--i": 6 }}>r</span>
                                  <span style={{ "--i": 7 }}>&nbsp;</span>
                                  <span style={{ "--i": 8 }}>a</span>
                                  <span style={{ "--i": 9 }}>&nbsp;</span>
                                  <span style={{ "--i": 10 }}>f</span>
                                  <span style={{ "--i": 11 }}>a</span>
                                  <span style={{ "--i": 12 }}>v</span>
                                  <span style={{ "--i": 13 }}>o</span>
                                  <span style={{ "--i": 14 }}>r</span>
                                  <span style={{ "--i": 15 }}>i</span>
                                  <span style={{ "--i": 16 }}>t</span>
                                  <span style={{ "--i": 17 }}>o</span>
                                  <span style={{ "--i": 18 }}>s</span>
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            ;
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
      ) : (
        <div
          key="slider @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ MOVIL"
          id="carouselExampleIndicators"
          className="carousel slide col-11 mx-auto"
          data-bs-ride="true"
        >
          {/* <div key="carousel indicators" className="carousel-indicators">
            {bikesResults.map((bike, index) => {
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
          </div> */}
          <div className="carousel-inner">
            {bikesResults.map((bike, index) => {
              return (
                <div
                  key={index}
                  className={`motocard motocardmovilH col-11 col-xxl-3 col-xl-3 col-lg-4 text-white bordecitoall mx-auto carousel-item${
                    index === 0 ? " active" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${bike.bike_photo})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "#070707",
                  }}
                >
                  <div className="imagen">
                    <div className="free">
                      <div className="headcontent bordecitoall bg-black">
                        <div className="sizehomet spartan text-center">
                          {bike.model}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`content bordecitoup col-12 container d-flex flex-column justify-content-between align-items-center${
                        moreInfo === true ? " contentmovil" : ""
                      }`}
                    >
                      <div className="ms-3 sizehomes">
                        Hola esto es el texto emergente
                      </div>
                      <div className="row mb-3">
                        {moreInfo ? (
                          <button onClick={setMoreInfo(false)}>See less</button>
                        ) : null}
                        {store.userType == "User" ||
                        store.userType == "photographer" ? (
                          <button
                            className="botonfavs sizehomes mx-auto pt-auto"
                            onClick={() => addFavoriteBike()}
                          >
                            <span style={{ "--i": 1 }}>A</span>
                            <span style={{ "--i": 2 }}>ñ</span>
                            <span style={{ "--i": 3 }}>a</span>
                            <span style={{ "--i": 4 }}>d</span>
                            <span style={{ "--i": 5 }}>i</span>
                            <span style={{ "--i": 6 }}>r</span>
                            <span style={{ "--i": 7 }}>&nbsp;</span>
                            <span style={{ "--i": 8 }}>a</span>
                            <span style={{ "--i": 9 }}>&nbsp;</span>
                            <span style={{ "--i": 10 }}>f</span>
                            <span style={{ "--i": 11 }}>a</span>
                            <span style={{ "--i": 12 }}>v</span>
                            <span style={{ "--i": 13 }}>o</span>
                            <span style={{ "--i": 14 }}>r</span>
                            <span style={{ "--i": 15 }}>i</span>
                            <span style={{ "--i": 16 }}>t</span>
                            <span style={{ "--i": 17 }}>o</span>
                            <span style={{ "--i": 18 }}>s</span>
                          </button>
                        ) : null}
                      </div>
                    </div>
                    {moreInfo ? null : (
                      <button onClick={setMoreInfo(true)}>See more</button>
                    )}
                  </div>
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
      )}

      <div className="entrada col-10 col-xxl-8 mx-auto text-center sizehome2 bordecitoall mb-5 imagenn px-2 py-1 spartan text-white">
        <div className="reveal">
          Todas estas motos están elegidas en función de como has respondido a
          las preguntas, si quieres volver a realizar el test pincha aqui. ¡No
          olvides guardar en favoritos las motos que mas te hayan gustado para
          poder revisarlas mas adelante!
        </div>
        <div className="">
          <button
            className="botonaco mx-auto py-3 px-1 mt-3 mb-5 sizehomet"
            onClick={() => {
              removeResult();
              Navigate("/test");
            }}
          >
            {" "}
            <span style={{ "--i": 1 }}>R</span>
            <span style={{ "--i": 2 }}>e</span>
            <span style={{ "--i": 3 }}>p</span>
            <span style={{ "--i": 4 }}>e</span>
            <span style={{ "--i": 5 }}>t</span>
            <span style={{ "--i": 6 }}>i</span>
            <span style={{ "--i": 7 }}>r</span>
            <span style={{ "--i": 8 }}>&nbsp;</span>
            <span style={{ "--i": 9 }}>T</span>
            <span style={{ "--i": 10 }}>e</span>
            <span style={{ "--i": 11 }}>s</span>
            <span style={{ "--i": 12 }}>t</span>
          </button>
        </div>
      </div>
    </div>
  );
};
