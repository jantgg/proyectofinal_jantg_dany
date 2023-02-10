import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Test = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState("q1");
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [bikesResults, setBikesResults] = useState([]);

  useEffect(() => {
    actions.getQuestions();
    getAnswers();
  }, []);

  const getAnswers = async () => {
    await actions.getAnswers();
    setCurrentAnswers(
      store.answers.map((obj) => {
        if (obj.current_question_id == currentQuestion) {
          return obj;
        }
      })
    );
  };

  return currentQuestion == "end" ? (
    navigate("/result")
  ) : (
    <div
      key="elmismotest @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      className="row "
    >
      {store.questions.map((question) => {
        return currentQuestion == question.id ? (
          <div key={question.id}>
            <div className="col-12 mx-auto  text-white">
              {store.userType != "user" && store.userType != "photographer" ? (
                <div className="col-4 mx-auto text-center mb-5  fs-3 text-wrap lh-sm border border-danger rounded pb-2">
                  Recuerda logearte antes de comenzar el test para poder guardar
                  los resultados
                </div>
              ) : null}
              <div className="col-8 mx-auto text-center mt-5 fs-1 text-wrap lh-sm border border-danger">
                {question.question}
                <br></br>
                {currentQuestion == "q1" ? null : (
                  <button
                    className="fs-6  ms-auto botonaco p-1 px-2 btn-outline-dark"
                    onClick={() => {
                      let newQuestion = currentQuestion;
                      function restar1(initialString) {
                        let number = parseInt(initialString.substr(1));
                        number -= 1;
                        let newQuestion = "q" + number.toString();

                        return newQuestion;
                      }
                      setCurrentQuestion(restar1(currentQuestion));
                    }}
                  >
                    <span>
                      Haz click aqui para volver a la pregunta anterior
                    </span>
                  </button>
                )}
              </div>
            </div>
            <div className="col-12 mx-auto d-flex justify-content-evenly text-white text-center border border-danger">
              {currentAnswers.map((answer) => {
                return (
                  <div
                    key={answer.id}
                    className="col-3 mx-auto mb-5 fs-3 text-wrap"
                  >
                    <button
                      className="btn"
                      onClick={() => {
                        setUserAnswers(...userAnswers, answer.answer);
                        setCurrentQuestion(answer.next_question);
                      }}
                    >
                      {answer.answer}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="col-12 mx-auto  text-white text-center">
              <div className="col-8 mx-auto text-center mt-5 fs-1 text-wrap lh-sm border border-danger">
                {question.notes}
              </div>
              <div className="">
                <button
                  className="botonaco"
                  onClick={() => {
                    setCurrentQuestion("q1");
                  }}
                >
                  <span>REPETIR TEST</span>
                </button>
                <button
                  className="botonaco"
                  onClick={() => {
                    setCurrentQuestion("end");
                  }}
                >
                  <span>ir a resultados</span>
                </button>
              </div>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};
