import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";

export const Bestroutes = () => {
  return (
    <div className="container">
      <Link to="/">
        <button>
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Back home
          </span>
        </button>
      </Link>
    </div>
  );
};
