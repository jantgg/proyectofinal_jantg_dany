import React, { useState, useContext } from "react";
import "../../styles/sliderbueno.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

//<Sliderbueno data={bikesResults} groupSize={4} />

const SilderBueno = ({ data, groupSize }) => {
  const Navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + groupSize;
  const dataToRender = data.slice(startIndex, endIndex);
  const [isVisible, setIsVisible] = useState(true);

  const handleNextClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStartIndex(startIndex + groupSize);
      setTimeout(() => {
        setIsVisible(true);
      }, 250);
    }, 200);
  };

  const handlePrevClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStartIndex(Math.max(startIndex - groupSize, 0));
      setTimeout(() => {
        setIsVisible(true);
      }, 250);
    }, 200);
  };

  return (
    <div
      className={`sliderbueno row ${isVisible ? "show-slider" : "hide-slider"}`}
    >
      <button
        className={` sizehomet text-white${
          startIndex === 0 ? " opa0" : " opa1"
        }`}
        onClick={handlePrevClick}
        disabled={startIndex === 0}
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div
        className={`item-container col-10 mx-0 px-0 ${
          isVisible ? " show-slider" : " hide-slider"
        }`}
      >
        {dataToRender.map((bike, index) => (
          <div
            key={index}
            className=" motocard colp text-white bordecitoall mx-auto"
            style={{ backgroundImage: `url(${bike.bike_photo})` }}
          >
            <div className="imagen">
              <div className="free">
                <div className="headcontent bordecitoall bg-black">
                  <div className="sizehomet spartan text-center">
                    {bike.model}
                  </div>
                </div>
              </div>

              <div className="content bordecitoup col-12 container d-flex flex-column justify-content-between align-items-center">
                <div className="ms-3 sizehomes">
                  Hola esto es el texto emergente
                </div>
                <div className="row mb-3">
                  {store.userType == "User" ||
                  store.userType == "photographer" ? (
                    <button
                      key="button"
                      className="botonfavs sizehomes mx-auto pt-auto"
                      onClick={() => addFavoriteBike()}
                    >
                      <span style={{ "--i": 1 }}>A</span>
                      <span style={{ "--i": 2 }}>ñ</span>
                      <span style={{ "--i": 3 }}>a</span>
                      <span style={{ "--i": 4 }}>d</span>
                      <span style={{ "--i": 5 }}>i</span>
                      <span style={{ "--i": 6 }}>r</span>
                      <span style={{ "--i": 7 }}>&nbsp;</span>
                      <span style={{ "--i": 8 }}>a</span>
                      <span style={{ "--i": 9 }}>&nbsp;</span>
                      <span style={{ "--i": 10 }}>f</span>
                      <span style={{ "--i": 11 }}>a</span>
                      <span style={{ "--i": 12 }}>v</span>
                      <span style={{ "--i": 13 }}>o</span>
                      <span style={{ "--i": 14 }}>r</span>
                      <span style={{ "--i": 15 }}>i</span>
                      <span style={{ "--i": 16 }}>t</span>
                      <span style={{ "--i": 17 }}>o</span>
                      <span style={{ "--i": 18 }}>s</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className={` sizehomet text-white${
          endIndex >= data.length ? " opa0" : " opa1"
        }`}
        onClick={handleNextClick}
        disabled={endIndex >= data.length}
      >
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default SilderBueno;
