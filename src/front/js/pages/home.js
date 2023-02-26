import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/images.css";
import { Card } from "../component/card";
import { Slider } from "../component/slider";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Home = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".revealUp").forEach((elem) => {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 80%",
        end: "bottom 20%",
        markers: true,
        onEnter: () => {
          gsap.fromTo(
            elem,
            { y: 100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "back",
              overwrite: "auto",
            }
          );
        },
        onLeave: () => {
          gsap.fromTo(
            elem,
            { autoAlpha: 1 },
            { autoAlpha: 0, overwrite: "auto" }
          );
        },
        onEnterBack: () => {
          gsap.fromTo(
            elem,
            { y: -100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "back",
              overwrite: "auto",
            }
          );
        },
        onLeaveBack: () => {
          gsap.fromTo(
            elem,
            { autoAlpha: 1 },
            { autoAlpha: 0, overwrite: "auto" }
          );
        },
      });
    });
  }, []);
  return (
    <div className=" mx-auto row ">
      <div className="bordecitol col-7 mx-auto heightborder"></div>
      <div className="col-11 imagen1 mx-auto py-5 bordecitoall">
        <br></br>
        <div className="col-10 text-white sizehome mx-auto text-center mt-5 spartan">
          <b>Encuentra la moto perfecta</b>
        </div>
        <div className=" col-8 text-white sizehome2 mx-auto text-center mt-2 mb-5 ">
          Responde a una seleccion de preguntas planteadas con el fin de
          encontrar la moto que mejor se adapte a tus necesidades
        </div>

        <div className="row">
          <button
            className="botonaco mx-auto py-3 mt-3 mb-5 sizehomet waviy"
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
      <div className="bordecitor col-6 mx-auto heightborder3"></div>
      <div className="col-11 imagen2 mx-auto py-5 bordecitoall">
        <br></br>
        <div className="col-10 text-white sizehome mx-auto text-center mt-5 spartan">
          <b>Visita lugares increíbles</b>
        </div>
        <div className=" col-8 text-white sizehome2 mx-auto text-center mt-2 mb-5 ">
          Encuentra las mejoras rutas creadas por y para moteros cerca de ti y
          descubre todo lo que pueden ofrecer nuestras carreteras
        </div>

        <div className="row">
          <button
            className="botonaco mx-auto py-3 mt-3 mb-5 sizehomet col-2"
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
      <div className="bordecitol col-5 mx-auto heightborder3"></div>
      <div className="col-11 imagen3 mx-auto py-5 bordecitoall">
        <br></br>
        <div className="col-10 text-white sizehome mx-auto text-center mt-5 spartan">
          <b>Inmortaliza momentos únicos</b>
        </div>
        <div className=" col-8 text-white sizehome2 mx-auto text-center mt-2 mb-5 ">
          Consigue impresionantes fotos sobre tu montura con los mejores
          fotógrafos de nuestro país o únete como profesional a la mejor
          comunidad
        </div>

        <div className="row">
          <button
            className="botonaco2 mx-auto py-3 mt-3 mb-5 sizehomet col-2"
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

      <div className="bordecitor col-5 mx-auto mb-0 heightborder2"></div>
    </div>
  );
};
