import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/forall.css";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Home = () => {
  const Navigate = useNavigate();
  const isDesktop = window.innerWidth >= 1000;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".revealUp").forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 85%",
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
        onLeave: () => {},
        onEnterBack: () => {},
        onLeaveBack: () => {},
      });
    });
  }, []);
  return (
    <div className=" mx-auto row ">
      <div className="col-12 row mx-auto revealUp">
        <div className="bordecitol col-10 mx-auto heightborder"></div>
        <div className="col-11 imagen1 mx-auto pb-2 bordecitoall">
          <div className="col-12 col-xxl-10 col-xl-10 col-lg-8 text-white sizehome mx-auto text-center mt-5 spartan">
            <b>Encuentra la moto perfecta</b>
          </div>
          <div className="col-12 col-xxl-8 col-xl-8 col-lg-6 text-white sizehome2 mx-auto text-center mt-2 mb-5 ">
            Responde a una seleccion de preguntas planteadas con el fin de
            encontrar la moto que mejor se adapte a tus necesidades
          </div>

          <div className="mx-auto center-align">
            <button
              className={`botonaco mx-auto py-3 px-4 mt-3 mb-5 sizehomet ${
                isDesktop ? "" : "w100"
              }`}
              onClick={() => {
                Navigate("/test");
              }}
            >
              {" "}
              <span style={{ "--i": 1 }}>H</span>
              <span style={{ "--i": 2 }}>a</span>
              <span style={{ "--i": 3 }}>c</span>
              <span style={{ "--i": 4 }}>e</span>
              <span style={{ "--i": 5 }}>r</span>
              <span style={{ "--i": 6 }}>&nbsp;</span>
              <span style={{ "--i": 7 }}>e</span>
              <span style={{ "--i": 8 }}>l</span>
              <span style={{ "--i": 9 }}>&nbsp;</span>
              <span style={{ "--i": 10 }}>t</span>
              <span style={{ "--i": 11 }}>e</span>
              <span style={{ "--i": 12 }}>s</span>
              <span style={{ "--i": 13 }}>t</span>
            </button>
          </div>
        </div>
        <div className="bordecitor col-6 mx-auto heightborder"></div>
      </div>
      <div className="col-12 row mx-auto revealUp">
        <div className="col-11 imagen2 mx-auto pb-2 bordecitoall ">
          <div className="col-12 col-xxl-10 col-xl-10 col-lg-8 text-white sizehome mx-auto text-center mt-5 spartan">
            <b>Visita lugares increíbles</b>
          </div>
          <div className="col-12 col-xxl-8 col-xl-8 col-lg-6 text-white sizehome2 mx-auto text-center mt-2 mb-5 ">
            Encuentra las mejoras rutas creadas por y para moteros cerca de ti y
            descubre todo lo que pueden ofrecer nuestras carreteras
          </div>

          <div className="mx-auto center-align">
            <button
              className={`botonaco mx-auto py-3 px-4 mt-3 mb-5 sizehomet ${
                isDesktop ? "" : "w100"
              }`}
              onClick={() => {
                Navigate("/bestroutes");
              }}
            >
              <span style={{ "--i": 1 }}>V</span>
              <span style={{ "--i": 2 }}>e</span>
              <span style={{ "--i": 3 }}>r</span>
              <span style={{ "--i": 4 }}>&nbsp;</span>
              <span style={{ "--i": 5 }}>l</span>
              <span style={{ "--i": 6 }}>a</span>
              <span style={{ "--i": 7 }}>s</span>
              <span style={{ "--i": 8 }}>&nbsp;</span>
              <span style={{ "--i": 9 }}>r</span>
              <span style={{ "--i": 10 }}>u</span>
              <span style={{ "--i": 11 }}>t</span>
              <span style={{ "--i": 12 }}>a</span>
              <span style={{ "--i": 13 }}>s</span>
            </button>
          </div>
        </div>
        <div className="bordecitol col-5 mx-auto heightborder"></div>
      </div>
      <div className="col-12 row mx-auto revealUp">
        <div className="col-11 imagen3 mx-auto pb-2 bordecitoall ">
          <div className="col-12 col-xxl-10 col-xl-10 col-lg-8 text-white sizehome mx-auto text-center mt-5 spartan">
            <b>Inmortaliza momentos únicos</b>
          </div>
          <div className="col-12 col-xxl-8 col-xl-8 col-lg-6 text-white sizehome2 mx-auto text-center mt-2 mb-5 ">
            Consigue impresionantes fotos sobre tu montura con los mejores
            fotógrafos de nuestro país o únete como profesional a la mejor
            comunidad
          </div>

          <div className="mx-auto center-align">
            <button
              className={`botonaco mx-auto py-3 px-4 mt-3 mb-5 sizehomet ${
                isDesktop ? "" : "w100"
              }`}
              onClick={() => {
                Navigate("/bestphotographers");
              }}
            >
              <span style={{ "--i": 1 }}>V</span>
              <span style={{ "--i": 2 }}>e</span>
              <span style={{ "--i": 3 }}>r</span>
              <span style={{ "--i": 4 }}>&nbsp;</span>
              <span style={{ "--i": 5 }}>p</span>
              <span style={{ "--i": 6 }}>r</span>
              <span style={{ "--i": 7 }}>o</span>
              <span style={{ "--i": 8 }}>f</span>
              <span style={{ "--i": 9 }}>e</span>
              <span style={{ "--i": 10 }}>s</span>
              <span style={{ "--i": 11 }}>i</span>
              <span style={{ "--i": 12 }}>o</span>
              <span style={{ "--i": 13 }}>n</span>
              <span style={{ "--i": 14 }}>a</span>
              <span style={{ "--i": 15 }}>l</span>
              <span style={{ "--i": 16 }}>e</span>
              <span style={{ "--i": 17 }}>s</span>
            </button>
          </div>
        </div>
        <div className="bordecitor col-5 mx-auto mb-0 heightborder"></div>
      </div>
    </div>
  );
};
