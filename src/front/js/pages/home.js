import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/images.css";
import { Card } from "../component/card";
import { Slider } from "../component/slider";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="row">
      <div className="col-12 imagen1 mx-auto py-5">
        <br></br>
        <div className="col-10 text-white sizehome mx-auto text-center mt-5">
          Encuentra la moto de tus sueños
        </div>
        <div className=" col-8 text-white sizehome2 mx-auto text-center mt-2 mb-5 ">
          Respondiendo a una seleccion de preguntas planteadas con el fin de
          encontrar la moto que mejor se adapte a tus necesidades
        </div>
        <Link to="/test">
          <button className="mx-auto">
            <span>Quiero hacer el test</span>
          </button>
        </Link>
      </div>

      <div className="col-11 mx-auto  text-white">
        <h1>//Rutas</h1>
        <div>
          Encuentra las mejoras rutas creadas por y para moteros cerca de ti y
          descubre todo lo que pueden ofrecer nuestras carreteras y pueblos
        </div>
        <Link to="/bestroutes">
          <button>
            <span>Quiero ver las rutas</span>
          </button>
        </Link>
      </div>
      <div className="col-11 mx-auto text-white">
        <h1>//Fotógrafos</h1>
        <div>
          Inmortaliza los momentos únicos sobre tu montura con los mejores
          fotógrafos de nuestro país y únete como profesional a la mejor
          comunidad
        </div>
        <Link to="/bestphotographers">
          <button>
            <span>Quiero conocerles</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
