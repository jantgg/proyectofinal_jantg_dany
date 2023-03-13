import React, { useState, useContext } from "react";
import "../../styles/sliderbueno.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

//<Sliderbueno data={bikesResults} groupSize={4} />

const SliderPhotos = ({ data, groupSize }) => {
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
    <>
      <div
        className={`sliderbueno mx-auto row ${
          isVisible ? "show-slider" : "hide-slider"
        }`}
      >
        <button
          className={` sizehomet sliderbtn text-white${
            startIndex === 0 ? " opa0" : " opa1"
          }`}
          onClick={handlePrevClick}
          disabled={startIndex === 0}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div
          className={`item-container col-10 mx-0 px-0 ${
            isVisible ? " show-slider" : " hide-slider"
          }`}
        >
          {dataToRender.map((url) => (
            <img
              style={{ objectFit: "cover" }}
              className="colpp"
              src={url}
              alt="Preview"
              key={url}
            />
          ))}
        </div>

        <button
          className={` sizehomet sliderbtn text-white${
            endIndex >= data.length ? " opa0" : " opa1"
          }`}
          onClick={handleNextClick}
          disabled={endIndex >= data.length}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </>
  );
};

export default SliderPhotos;
