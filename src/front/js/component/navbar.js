import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Navbar = () => {
  return (
    <div className="row ">
      <nav className=" col-11 navbar navbar-expand-lg  bordecito mx-auto">
        <div className="container-fluid">
          <a className="navbar-brand texto-amarillo" href="#">
            Home
          </a>
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
                <a className="nav-link texto-amarillo" href="#">
                  Test
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link texto-amarillo" href="#">
                  Rutas
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link texto-amarillo" href="#">
                  Fotógrafos
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link texto-amarillo" href="#">
                  Mi Perfil
                </a>
              </div>
            </ul>
            <ul className="navbar-nav ms-auto">
              <div className="nav-item">
                <a className="nav-link texto-amarillo" href="#">
                  Log in
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link texto-amarillo" href="#">
                  Sign in
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link texto-amarillo" href="#">
                  Log out
                </a>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
