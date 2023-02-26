import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/registerform.css";
import { useNavigate } from "react-router-dom";

export const Userregister = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [erroruser, setErrorUser] = useState("");
  const [erroremail, setErrorEmail] = useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [inputclickeduser, setInputClickedUser] = useState(false);
  const [inputclickedemail, setInputClickedEmail] = useState(false);
  const [inputclickedpassword, setInputClickedPassword] = useState(false);

  useEffect(() => {
    areEqual();
  }, [confirmpassword]);

  const areEqual = () => {
    if (password == confirmpassword) {
      setPasswordError(false);
    } else setPasswordError(true);
  };

  const handleCheckbox = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const sendUserRegister = async () => {
    const response = await fetch(store.backendurl + "register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
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
        "*El usuario indicado ya esta siendo utilizado por otro usuario."
      )
        setErrorUser(errorMessage.response);
      if (
        errorMessage.response ==
        "*El correo electrónico indicado ya esta siendo utilizado por otro usuario."
      )
        setErrorEmail(errorMessage.response);
      if (
        errorMessage.response ==
        "*La contraseña introducida es diferente, por favor, revise la contraseña introducida."
      )
        setPasswordError(errorMessage.response);
    }
  };

  return (
    <main className="w-100 m-auto">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="main-heading">
                  Registrate como usario en OnBikes <br></br> o <br></br>
                  <Link to={"/photographerregister"} className="text-center">
                    Registrarte como fotógrafo
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
                        "*El usuario indicado ya esta siendo utilizado por otro usuario." ? (
                          <p className="text-danger">erroruser</p>
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
                      Email
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
                        "*El correo electrónico indicado ya esta siendo utilizado por otro usuario." ? (
                          <p className="text-danger">erroremail</p>
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
                        "*La contraseña introducida es diferente, por favor, revise la contraseña introducida." ? (
                          <p className="text-danger">passworderror</p>
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
                      {passworderror == true ? (
                        <p className="text-danger">
                          *La contraseña de confirmación no coincide
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 offset-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="termsAndConditions"
                          required
                          checked={termsAccepted}
                          onChange={handleCheckbox}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="termsAndConditions"
                        >
                          Acepto los terminos y las condiciones.
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
                            sendUserRegister();
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
