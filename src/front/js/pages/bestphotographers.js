import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";

export const Bestphotographers = () => {
  return (
    <div className="">
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
