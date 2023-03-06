import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";
import "../../styles/test.css";
import "../../styles/spiner.css";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Test = () => {
  const { store, actions } = useContext(Context);
  const Navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState("q1");
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [bikesResults, setBikesResults] = useState([]);
  const [movingQuestion, setMovingQuestion] = useState("q1");
  const [isMovingOut, setIsMovingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    actions.getQuestions();
    getAnswers();
    setIsVisible(true);

    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".revealUp").forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 60%",
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
      });
    });
  }, []);

  useEffect(() => {
    setIsMovingOut(true);
    setTimeout(() => {
      setIsMovingOut(false);
      setMovingQuestion("q1");
    }, 500);
  }, [movingQuestion]);

  useEffect(() => {
    if (currentQuestion === "end") {
      sendAnswers();
    }
  }, [currentQuestion]);

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    setCurrentAnswers(
      store.answers.filter((obj) => obj.current_question_id == currentQuestion)
    );
  }, [currentQuestion]);

  const getAnswers = async () => {
    await actions.getAnswers();
    setCurrentAnswers(
      store.answers.filter((obj) => obj.current_question_id == currentQuestion)
    );
  };

  const answerPop = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers.pop();
    setUserAnswers(updatedAnswers);
  };

  const sendAnswers = async () => {
    const response = await fetch(store.backendurl + "answers", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(userAnswers),
    });
    if (response.ok) {
      const data = await response.json();
      await new Promise((resolve) => {
        localStorage.setItem("Results", data.result);
        resolve();
      });
      console.log(data.result);
      Navigate("/result");
    } else {
      console.log("response not ok");
    }
  };

  //MOSTRAR Y OCULTAR DIVS
  function ocultarDivs() {
    const toHide = document.querySelectorAll(".tohide");
    toHide.forEach((element) => {
      element.style.opacity = "0";
      element.style.transition = "opacity 0.2s ease-out";
    });
  }

  return (
    <div
      key="elmismotest @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      className="row ms-0 revealUp"
    >
      {currentQuestion === "end" ? (
        <div className="revealUp">
          <div className="bordecitol col-7 mx-auto heightborder"></div>
          <div className="col-10 mx-auto text-center mt-0 bordecitoall sizehomeq py-5 px-3 text-wrap spartan imagen4 text-white minH">
            <div className="reveal">
              Estamos buscando las mejores motos
              <br />
              <div className="lds-spinner mt-5">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="bordecitor col-8 mx-auto heightborders "></div>
        </div>
      ) : null}
      {store.questions.map((question) => {
        return currentQuestion == question.id ? (
          <div key={question.id}>
            <div className="col-12 mx-auto text-white">
              {store.userType != "User" && store.userType != "Photographer" ? (
                <>
                  <div className="bordecitor col-8 mx-auto heightborders "></div>
                  <div className="col-9 mx-auto text-center  sizehome2 py-5 bordecitoall border-danger spartan imagenw">
                    Recuerda logearte antes de comenzar el test para poder
                    guardar los resultados
                  </div>
                </>
              ) : null}
              <div className="bordecitol col-7 mx-auto heightborder"></div>
            </div>

            <div className="col-10 mx-auto text-center mt-0 bordecitoall sizehomeq py-5 px-3 text-wrap spartan imagen4 text-white minH">
              <div className={`tohide ${isMovingOut ? "salida" : "reveal"}`}>
                <b>{question.question}</b>
              </div>

              {currentQuestion == "q1" ? null : (
                <div className="row mt-3 text-white">
                  <button
                    className="botonaco sizehomes px-2 py-3 mx-auto"
                    onClick={() => {
                      setCurrentQuestion(
                        userAnswers[userAnswers.length - 1].current_question_id
                      );
                      answerPop();
                    }}
                  >
                    <span>Volver a la pregunta anterior</span>
                  </button>
                </div>
              )}
            </div>

            <div
              className={` tohide col-10 mx-auto text-white pb-5 mb-5 row ma ${
                isMovingOut ? "salida" : "reveal"
              }`}
            >
              {currentAnswers.map((answer) => {
                return (
                  <div
                    key={answer.id}
                    className="col-12 col-xxl-4 col-xl-11 col-lg-11 mx-auto"
                  >
                    <div className="row mx-auto">
                      <button
                        className="botonaco3 sizehomet py-5 imagena mx-auto"
                        onClick={() => {
                          setUserAnswers([...userAnswers, answer]);
                          ocultarDivs();
                          setTimeout(() => {
                            setCurrentQuestion(answer.next_question_id);
                            setMovingQuestion(answer.next_question_id);
                          }, 300);
                        }}
                      >
                        <span className="py-5">{answer.answer}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="entrada col-10 col-xxl-6 mx-auto text-center sizehome2 bordecitoall mb-5 imagenn p-4 spartan text-white">
              <div className={`tohide ${isMovingOut ? "salida" : "reveal"}`}>
                {question.notes}
              </div>
            </div>

            <div className="row col-12 text-center">
              <button
                className="botonaco4 col-12 col-xxl-2 col-xl-11 col-lg-11 mb-4 me-5 ms-auto imagena"
                onClick={() => {
                  setCurrentQuestion("q1");
                  setUserAnswers("");
                }}
              >
                <span>
                  <b>REPETIR TEST</b>
                </span>
              </button>
              <button
                className="botonaco4 col-12 col-xxl-2 col-xl-12 col-lg-12 mb-4 ms-5 me-auto py-3 imagena"
                onClick={() => {
                  setIsVisible(false);
                  setCurrentQuestion("end");
                }}
              >
                <span>
                  <b>RESULTADOS</b>
                </span>
              </button>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};
