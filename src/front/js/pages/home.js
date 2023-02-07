import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/images.css";
import { Card } from "../component/card";
import { Slider } from "../component/slider";

export const Home = () => {
  return (
    <div className="row">
      <div className="col-11 mx-auto imagen1 text-white">
        <h1>//Test</h1>
        <div>
          Responde a una serie de preguntas perfectamente planteadas para
          encontrar la moto de tus sueños
        </div>
        <button>
          <span>Quiero hacer el test</span>
        </button>
      </div>
      <div className="col-11 mx-auto imagen1 text-white">
        <h1>//Rutas</h1>
        <div>
          Encuentra las mejoras rutas creadas por y para moteros cerca de ti y
          descubre todo lo que pueden ofrecer nuestras carreteras y pueblos
        </div>
        <button>
          <span>Quiero ver las rutas</span>
        </button>
      </div>
      <div className="col-11 mx-auto imagen1 text-white">
        <h1>//Fotógrafos</h1>
        <div>
          Inmortaliza los momentos únicos sobre tu montura con los mejores
          fotógrafos de nuestro país y únete como profesional a la mejor
          comunidad
        </div>
        <button>
          <span>Quiero conocerles</span>
        </button>
      </div>
    </div>
  );
};
