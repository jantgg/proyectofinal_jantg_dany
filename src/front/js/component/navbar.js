import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/forall.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [selected, setSelected] = useState(null);
  const isDesktop = window.innerWidth >= 1000;

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/test") {
      setSelected(0);
    } else if (currentPath === "/bestroutes") {
      setSelected(1);
    } else if (currentPath === "/bestphotographers") {
      setSelected(2);
    } else if (currentPath === "/") {
      setSelected(3);
    } else if (currentPath === "/user") {
      setSelected(4);
    } else if (currentPath === "/login") {
      setSelected(5);
    } else {
      setSelected(null);
    }
  }, []);

  return (
    <div className="row fixedup mx-auto">
      <nav className="col-11 navbar navbar-dark navbar-expand-lg bordecito mx-auto text-white sizehomet pt-2 spartan">
        <div className="container-fluid ">
          <Link
            to="/"
            className={`${
              isDesktop ? " ms-5" : " ms-2"
            } navbar-brand text-white sizehomet px-2 mx-5 me-5 ${
              selected === 3 && "bordecitos"
            }`}
            onClick={() => setSelected(3)}
          >
            Home
          </Link>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-white"></span>
          </button>
          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <div className="nav-item">
                <Link
                  to="/test"
                  className={`nav-link text-white mx-2 me-5 px-2 ${
                    selected === 0 && "bordecitos"
                  }`}
                  onClick={() => setSelected(0)}
                >
                  Test
                </Link>
              </div>
              <div className="nav-item">
                <Link
                  to="/bestroutes"
                  className={`nav-link text-white mx-2 me-5 px-2 ${
                    selected === 1 && "bordecitos"
                  }`}
                  onClick={() => setSelected(1)}
                >
                  Rutas
                </Link>
              </div>
              <div className="nav-item">
                <Link
                  to="/bestphotographers"
                  className={`nav-link text-white mx-2 me-5 px-2 ${
                    selected === 2 && "bordecitos"
                  }`}
                  onClick={() => setSelected(2)}
                >
                  Fotógrafos
                </Link>
              </div>
            </ul>
            <ul className="navbar-nav ms-auto">
              {store.userType == "User" || store.userType == "Photographer" ? (
                <>
                  <div className="nav-item">
                    <Link
                      to="/user"
                      className={`nav-link text-white mx-2 me-5 px-2 ${
                        selected === 4 && "bordecitos"
                      }`}
                      onClick={() => setSelected(4)}
                    >
                      Mi Perfil
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link
                      to="/"
                      className="nav-link text-white mx-2 px-2"
                      onClick={() => {
                        actions.logout();
                      }}
                    >
                      Desconectarse
                    </Link>
                  </div>
                </>
              ) : store.userType == null ? (
                <>
                  <div className="nav-item me-4">
                    <Link
                      to="/login"
                      className={`nav-link text-white mx-2 px-2 ${
                        selected === 5 && "bordecitos"
                      }`}
                      onClick={() => setSelected(5)}
                    >
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
