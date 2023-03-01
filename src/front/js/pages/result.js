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
    <div className="row revealUp">
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
        {bikesResults.map((bike, index) => {
          return (
            <>
              <div
                key={index}
                className="motocard text-white col-3 bordecitoall mx-auto"
                style={{ backgroundImage: `url(${bike.bike_photo})` }}
              >
                <div className="imagen">
                  <div className="free">
                    <div className="headcontent bordecitoall bg-black ">
                      <div className="sizehomet spartan text-center">
                        {bike.model}
                      </div>
                    </div>
                  </div>

                  <div className="content bordecitoup container d-flex flex-column justify-content-between align-items-center">
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
            </>
          );
        })}
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
            className="botonaco2"
            onClick={() => {
              Navigate("/test");
            }}
          >
            <span>REPETIR TEST</span>
          </button>
        </div>
      </div>
    </div>
  );
};
