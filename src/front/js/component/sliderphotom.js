import React, { useState, useContext, useRef } from "react";
import "../../styles/sliderm.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

//<SliderM data={bikesResults} groupSize={1} />

const SliderPhotosM = ({ data, groupSize }) => {
  const Navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + groupSize;
  const dataToRender = data.slice(startIndex, endIndex);
  const [isVisible, setIsVisible] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const containerRef = useRef(null);

  const handleTouchStart = (event) => {
    if (event.target === containerRef.current) {
      setTouchStartX(event.touches[0].clientX);
    }
  };

  const handleTouchMove = (event) => {
    if (event.target === containerRef.current) {
      setTouchEndX(event.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const touchDiff = touchStartX - touchEndX;
      if (touchDiff > 0) {
        handleNextClick();
      } else if (touchDiff < 0) {
        handlePrevClick();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

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
      // ref={containerRef}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
      className="sliderbuenom m-0"
    >
      <div className="item-containerm mx-auto px-0">
        {dataToRender.map((url, index) => (
          <div
            key={index}
            className={`motocard w100 text-white bordecitoall mx-auto ${
              isVisible ? " show-slider" : " hide-slider"
            }`}
            style={{
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="">
              <div className="free head-tranlucid">
                <div className="headcontent  row justify-content-between mt-2">
                  <button
                    className={` sizehomet boton-i col-2 text-black ${
                      startIndex === 0 ? " opa0" : " opa1"
                    }`}
                    onClick={handlePrevClick}
                    disabled={startIndex === 0}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>

                  <button
                    className={` sizehomet boton-i col-2 text-black ${
                      endIndex >= data.length ? " opa0" : " opa1"
                    }`}
                    onClick={handleNextClick}
                    disabled={endIndex >= data.length}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderPhotosM;
