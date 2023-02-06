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
      <div className="col-11 mx-auto">
        <h1>//Test</h1>
        <div>
          Responde a una serie de preguntas perfectamente planteadas para
          encontrar la moto de tus sueños
        </div>
        <button>
          <span>Quiero hacer el test</span>
        </button>
      </div>
      <div className="col-11 mx-auto">
        <h1>//Test</h1>
        <div>
          Responde a una serie de preguntas perfectamente planteadas para
          encontrar la moto de tus sueños
        </div>
        <button>
          <span>Quiero hacer el test</span>
        </button>
      </div>
    </div>
  );
};
