import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/registerform.css";
import { useNavigate } from "react-router-dom";

export const PhotographerRegister = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [erroremail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passworderror, setPasswordError] = useState(false);
  const [user_name, setUserName] = useState("");
  const [errorusername, setErrorUsername] = useState(false);
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [sunday, setSunday] = useState("");
  const [service, setService] = useState("");
  const [credentialserror, setCredentialsError] = useState(false);

  useEffect(() => {
    areEqual();
  }, [confirmpassword]);

  const sendPhotographerRegister = async () => {
    const response = await fetch(store.backendurl + "photographerregister", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        location: location,
        instagram: instagram,
        sunday: sunday,
        service: service,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/login");
    } else if (response.status == 300) {
      setErrorEmail(true);
    } else if (response.status == 409) {
      setErrorEmail(true);
    } else if (response.status == 410) {
      setErrorUsername(true);
    }
  };

  const areEqual = () => {
    if (password == confirmpassword) {
      setPasswordError(false);
    } else setPasswordError(true);
  };

  return (
    <main className="w-100 m-auto">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="main-heading">
                  Registrarte como fotógrafo en OnBikes<br></br> o <br></br>
                  <Link to={"/userregister"} className="text-center">
                    Registrate como usario
                  </Link>
                </h1>
                <div>
                  <div className="row mb-3">
                    <label
                      htmlFor="user"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Usuario
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control form-control-lg"
                        placeholder="Usuario"
                        type="name"
                        value={user_name}
                        onChange={(e) => {
                          setErrorUsername(false);
                          setCredentialsError(false);
                          setUserName(e.target.value);
                        }}
                        required
                        autoFocus
                      />
                      {errorusername ? (
                        <p className="text-danger">
                          *El nombre de usuario indicado ya esta siendo
                          utilizado por otro fotografo.
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      E-mail
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control form-control-lg"
                        placeholder="Correo electronico"
                        type="email"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => {
                          setErrorEmail(false);
                          setCredentialsError(false);
                          setEmail(e.target.value);
                        }}
                      />
                      {erroremail ? (
                        <p className="text-danger">
                          *El email indicado ya esta siendo utilizado por otra
                          persona.
                        </p>
                      ) : null}
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
                        className="form-control form-control-lg"
                        placeholder="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setCredentialsError(false);
                          setPassword(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="confirm_password"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Confirmar contraseña
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control form-control-lg"
                        placeholder="Confirmar contraseña"
                        type="password"
                        value={confirmpassword}
                        onChange={(e) => {
                          setCredentialsError(false);
                          setConfirmPassword(e.target.value);
                        }}
                        required
                      />
                      {passworderror == true ? (
                        <p className="text-danger">
                          *Las contraseñas no coinciden
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Provincia / Ciudad de trabajo
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control form-control-lg"
                        placeholder="Localización"
                        type="text"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Instagram
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control form-control-lg"
                        placeholder="@Instagram"
                        type="text"
                        value={instagram}
                        onChange={(e) => {
                          setInstagram(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Servicios
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control form-control-lg"
                        placeholder="Servicios"
                        type="text"
                        value={service}
                        onChange={(e) => {
                          setService(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Ubicación exacta
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control form-control-lg"
                        placeholder="Lugar Favorito"
                        type="text"
                        value={sunday}
                        onChange={(e) => {
                          setSunday(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 offset-md-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label
                          className="form-check-label"
                          htmlFor="temsAndConditions"
                        >
                          Acepto los terminos y condiciones.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-0 mt-4">
                    <div className="col-md-8 offset-md-3">
                      <button
                        type="submit"
                        className="btn btn-warning btn-lg ms-2 text-white"
                        onClick={() => {
                          if (passworderror == false) {
                            sendPhotographerRegister();
                          }
                        }}
                      >
                        <span>Registrarse</span>
                      </button>
                      <Link to={"/login"} className="text-decoration-none ps-4">
                        Tienes una cuenta?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
