import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/images.css";
import { Card } from "../component/card";
import { Slider } from "../component/slider";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const Navigate = useNavigate();
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
            className="botonaco mx-auto py-3 mt-3 mb-5 sizehomet"
            onClick={() => {
              Navigate("/test");
            }}
          >
            <span>Hacer el test</span>
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
            <span>Ver las rutas</span>
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
            <span>Ver profesionales</span>
          </button>
        </div>
      </div>

      <div className="bordecitor col-5 mx-auto mb-0 heightborder2"></div>
    </div>
  );
};
