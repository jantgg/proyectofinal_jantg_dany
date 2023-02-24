import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="row">
      <nav className=" col-11 navbar navbar-expand-lg bordecito mx-auto">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand texto-amarillo">
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
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <div className="nav-item">
                <Link to="/test" className="nav-link texto-amarillo">
                  Test
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/bestroutes" className="nav-link texto-amarillo">
                  Rutas
                </Link>
              </div>
              <div className="nav-item">
                <Link
                  to="/bestphotographers"
                  className="nav-link texto-amarillo"
                >
                  Fotógrafos
                </Link>
              </div>
            </ul>
            <ul className="navbar-nav ms-auto">
              {store.userType == "user" || store.userType == "photographer" ? (
                <>
                  <div className="nav-item">
                    <Link to="/user" className="nav-link texto-amarillo">
                      Mi Perfil
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link texto-amarillo"
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
                  <div className="nav-item">
                    <Link to="/login" className="nav-link texto-amarillo">
                      Log in
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link
                      to="/userregister"
                      className="nav-link texto-amarillo"
                    >
                      Sign in
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
