import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Test = () => {
  const { store, actions } = useContext(Context);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [userAnswers, setUsertAnswers] = useState([]);

  useEffect(() => {
    actions.getQuestions();
    actions.getAnswers();
    setCurrentQuestion("q1");
  }, []);

  return (
    <div className="row ">
      {store.questions.map((question) => {
        return currentQuestion == question.id ? (
          <>
            <div className="col-12 mx-auto imagen1 text-white ">
              {store.userType != "user" && store.userType != "photographer" ? (
                <div className="col-4 mx-auto text-center mb-5">
                  Recuerda logearte antes de comenzar el test para poder guardar
                  los resultados
                </div>
              ) : null}
              <div key={question.id} className="col-4 mx-auto text-center mt-5">
                {question.question}
                <button className="text-white ">
                  <span>Pregunta anterior</span>
                </button>
              </div>
            </div>
            <div className="col-12 mx-auto imagen1 text-white text-center">
              <div className="col-4 mx-auto mb-5">
                ESTA ES UNA RESPUESTA DEL TEST:
              </div>
            </div>
            <div className="col-12 mx-auto imagen1 text-white text-center">
              <div key={question.id} className="col-4 mx-auto">
                {question.notes}
                <button>
                  <span>REPETIR TEST</span>
                </button>
              </div>
            </div>
          </>
        ) : null;
      })}
    </div>
  );
};
