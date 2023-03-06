import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/loginform.css";
import "../../styles/forall.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialserror, setCredentialsError] = useState(false);

  const sendLogin = async () => {
    const response = await fetch(store.backendurl + "login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      await actions.syncuser();
      navigate("/");
    } else {
      setCredentialsError(true);
    }
  };
  return (
    <main className="w-100 m-auto">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="main-heading">Iniciar sesión en OnBikes</h1>
                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      E-mail
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        placeholder="Correo electronico"
                        type="email"
                        name="email"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => {
                          setCredentialsError(false);
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Contraseña
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        placeholder="Contraseña"
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => {
                          setCredentialsError(false);
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {credentialserror ? (
                    <p className="m-auto text-danger">
                      *El email y/o la contraseña son incorrectos.
                    </p>
                  ) : null}
                  <div className="row mb-3">
                    <div className="col-md-4 offset-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                          id="remember"
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Recordarme
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-0 mt-4">
                    <div className="col-md-8 offset-md-3">
                      <button
                        type="button"
                        className="btn btn-warning btn-lg ms-2 text-white"
                        onClick={() => sendLogin()}
                      >
                        <span>Iniciar sesión</span>
                      </button>
                      <Link
                        to={"/userregister"}
                        className="text-decoration-none ps-4"
                      >
                        No dispones de una cuenta aún ?
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
