import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Test = () => {
  const { store, actions } = useContext(Context);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [bikesResults, setBikesResults] = useState([]);

  useEffect(() => {
    actions.getQuestions();
    actions.getAnswers();
    setCurrentQuestion("q2");
    store.answers.map((x) => {
      // store.answer[x] = {};
      currentQuestion == store.answers[x].current_question_id
        ? setCurrentAnswers(...currentAnswers, store.answers[x])
        : null;
    });
  }, []);

  // useEffect(() => {
  //   setCurrentAnswers(
  //     store.answers.filter((obj) => obj.current_question_id === currentQuestion)
  //   );
  // }, [store.answers, currentQuestion]);

  console.log(store.answers);
  console.log(currentAnswers);
  return currentQuestion == "end" ? (
    <div
      key="losresultados @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      className="row "
    >
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
      <div className="col-12 mx-auto d-flex justify-content-evenly text-white text-center border border-danger">
        {bikesResults.map((bike) => {})}
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
            className="botonaco"
            onClick={() => {
              setCurrentQuestion("q1");
            }}
          >
            <span>REPETIR TEST</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      key="elmismotest @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      className="row "
    >
      {store.questions.map((question) => {
        return currentQuestion == question.id ? (
          <>
            <div className="col-12 mx-auto  text-white">
              {store.userType != "user" && store.userType != "photographer" ? (
                <div className="col-4 mx-auto text-center mb-5  fs-3 text-wrap lh-sm border border-danger rounded pb-2">
                  Recuerda logearte antes de comenzar el test para poder guardar
                  los resultados
                </div>
              ) : null}
              <div
                key={question.id}
                className="col-8 mx-auto text-center mt-5 fs-1 text-wrap lh-sm border border-danger"
              >
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
                <div className="col-3 mx-auto mb-5 fs-3 text-wrap">
                  <button
                    className="botonaco"
                    onClick={() => {
                      setUserAnswers(...userAnswers, answer.answer);
                      setCurrentQuestion(answer.next_question);
                    }}
                  >
                    {answer.answer}
                  </button>
                </div>;
              })}
            </div>
            <div className="col-12 mx-auto  text-white text-center">
              <div
                key={question.id}
                className="col-8 mx-auto text-center mt-5 fs-1 text-wrap lh-sm border border-danger"
              >
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
          </>
        ) : null;
      })}
    </div>
  );
};
