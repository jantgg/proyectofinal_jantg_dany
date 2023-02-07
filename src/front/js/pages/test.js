import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Test = () => {
  return (
    <div className="row ">
      <div className="col-12 mx-auto imagen1 text-white ">
        <div className="col-4 mx-auto text-center">
          ESTO ES UNA PREGUNTA DEL TEST<br></br>
          ESTO ES UNA PREGUNTA DEL TEST<br></br>
          ESTO ES UNA PREGUNTA DEL TEST<br></br>
          ESTO ES UNA PREGUNTA DEL TEST<br></br>
          <button className="text-white ">
            <span>Pregunta anterior</span>
          </button>
        </div>
      </div>
      <div className="col-12 mx-auto imagen1 text-white text-center">
        <div className="col-4 mx-auto">
          ESTA ES UNA RESPUESTA DEL TEST<br></br>
          ESTA ES UNA RESPUESTA DEL TEST<br></br>
          ESTA ES UNA RESPUESTA DEL TEST<br></br>
        </div>
      </div>
      <div className="col-12 mx-auto imagen1 text-white text-center">
        <div className="col-4 mx-auto">
          ESTO ES UNA NOTA DEL TEST<br></br>
          <button>
            <span>REPETIR TEST</span>
          </button>
        </div>
      </div>
    </div>
  );
};
