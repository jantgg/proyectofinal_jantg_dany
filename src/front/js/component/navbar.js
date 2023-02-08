import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Navbar = () => {
  return (
    <div className="row ">
      <nav className=" col-11 navbar navbar-expand-lg  bordecito mx-auto ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand texto-amarillo" href="#">
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
                <Link to="/test" className="nav-link texto-amarillo" href="#">
                  Test
                </Link>
              </div>
              <div className="nav-item">
                <Link
                  to="/bestroutes"
                  className="nav-link texto-amarillo"
                  href="#"
                >
                  Rutas
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/bp" className="nav-link texto-amarillo" href="#">
                  Fotógrafos
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/user" className="nav-link texto-amarillo" href="#">
                  Mi Perfil
                </Link>
              </div>
            </ul>
            <ul className="navbar-nav ms-auto">
              <div className="nav-item">
                <Link to="/login" className="nav-link texto-amarillo" href="#">
                  Log in
                </Link>
              </div>
              <div className="nav-item">
                <Link
                  to="/userregister"
                  className="nav-link texto-amarillo"
                  href="#"
                >
                  Sign in
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/" className="nav-link texto-amarillo" href="#">
                  Log out
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
