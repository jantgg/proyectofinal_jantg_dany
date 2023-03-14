import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/registerform.css";
import "../../styles/forall.css";
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
  const [erroruser, setErrorUser] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [inputclickeduser, setInputClickedUser] = useState(false);
  const [inputclickedemail, setInputClickedEmail] = useState(false);
  const [inputclickedpassword, setInputClickedPassword] = useState(false);

  useEffect(() => {
    areEqual();
  }, [confirmpassword]);

  const handleCheckbox = (event) => {
    setTermsAccepted(event.target.checked);
  };

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
    } else {
      const errorMessage = await response.json();
      if (
        errorMessage.response ==
        "The indicated username is already being used by another user or photographer"
      )
        setErrorUser(errorMessage.response);
      if (
        errorMessage.response ==
        "The indicated email is already being used by another user or photographer"
      )
        setErrorEmail(errorMessage.response);
      if (
        errorMessage.response ==
        "The entered password is different, please check the password"
      )
        setPasswordError(errorMessage.response);
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
                        className="form-control"
                        type="name"
                        value={user_name}
                        onChange={(e) => {
                          setErrorUser("");
                          setCredentialsError(false);
                          setUserName(e.target.value);
                        }}
                        onClick={() => {
                          setInputClickedUser(true);
                        }}
                        onBlur={() => {
                          setInputClickedUser(false);
                        }}
                        required
                        autoFocus
                      />
                      <div>
                        {erroruser ==
                        "The indicated username is already being used by another user or photographer" ? (
                          <p className="text-danger">
                            *El nombre de usuario indicado ya está siendo
                            utilizado por otro usuario o fotógrafo.
                          </p>
                        ) : null}
                        {inputclickeduser ? (
                          <p className="text-secondary">
                            El usuario debe estar comprendido entre 5 y 20
                            caracteres.
                          </p>
                        ) : null}
                      </div>
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
                        className="form-control"
                        type="email"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => {
                          setErrorEmail("");
                          setCredentialsError(false);
                          setEmail(e.target.value);
                          setInputClickedEmail(true);
                        }}
                        onClick={() => {
                          setInputClickedEmail(true);
                        }}
                        onBlur={() => {
                          setInputClickedEmail(false);
                        }}
                      />
                      <div>
                        {erroremail ==
                        "The indicated email is already being used by another user or photographer" ? (
                          <p className="text-danger">
                            *El email indicado ya está siendo utilizado por otro
                            usuario o fotógrafo."
                          </p>
                        ) : null}
                        {inputclickedemail ? (
                          <p className="text-secondary">
                            El correo electrónico debe tener un formato correcto
                            example@example.es
                          </p>
                        ) : null}
                      </div>
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
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPasswordError(false);
                          setPassword(e.target.value);
                        }}
                        onClick={() => {
                          setInputClickedPassword(true);
                        }}
                        onBlur={() => {
                          setInputClickedPassword(false);
                        }}
                        required
                      />
                      <div>
                        {passworderror ==
                        "The entered password is different, please check the password" ? (
                          <p className="text-danger">
                            *Las contraseñas ingresadas son diferentes,
                            verifique la contraseña.
                          </p>
                        ) : null}
                        {inputclickedpassword ? (
                          <p className="text-secondary">
                            *La contraseña debe tener al menos 8 caracteres y
                            como maximo 50, debe contener al menos una letra
                            mayúscula, una letra minúscula, un número y un
                            carácter especial por ejemplo: '! # $ % & * ? @'
                          </p>
                        ) : null}
                      </div>
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
                        className="form-control"
                        type="password"
                        value={confirmpassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        required
                      />
                      <div>
                        {passworderror == true ? (
                          <p className="text-danger">
                            *La contraseña de confirmación no coincide
                          </p>
                        ) : null}
                      </div>
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
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="termsAndConditions"
                          checked={termsAccepted}
                          onChange={handleCheckbox}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="termsAndConditions"
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
                          if (!termsAccepted) {
                            alert(
                              "Por favor acepta los términos y condiciones."
                            );
                            return;
                          }
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
