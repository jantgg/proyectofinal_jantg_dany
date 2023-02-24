import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="row">
      <nav className="col-11 navbar navbar-expand-lg bordecito mx-auto text-white sizehomet pt-2 spartan">
        <div className="container-fluid ">
          <Link
            to="/"
            className="ms-5 navbar-brand text-white sizehomet mx-5 me-5 "
          >
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <div className="nav-item">
                <Link to="/test" className="nav-link text-white mx-2 me-5">
                  Test
                </Link>
              </div>
              <div className="nav-item">
                <Link
                  to="/bestroutes"
                  className="nav-link text-white mx-2 me-5"
                >
                  Rutas
                </Link>
              </div>
              <div className="nav-item">
                <Link
                  to="/bestphotographers"
                  className="nav-link text-white mx-2 me-5"
                >
                  Fotógrafos
                </Link>
              </div>
            </ul>
            <ul className="navbar-nav ms-auto">
              {store.userType == "user" || store.userType == "photographer" ? (
                <>
                  <div className="nav-item">
                    <Link to="/user" className="nav-link text-white mx-2 me-5">
                      Mi Perfil
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link
                      to="/"
                      className="nav-link text-white mx-2"
                      onClick={() => {
                        actions.logout();
                      }}
                    >
                      Log out
                    </Link>
                  </div>
                </>
              ) : store.userType == null ? (
                <>
                  <div className="nav-item me-4">
                    <Link to="/login" className="nav-link text-white mx-2">
                      Log in
                    </Link>
                  </div>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
