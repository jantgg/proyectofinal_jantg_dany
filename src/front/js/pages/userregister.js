import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import "../../styles/forall.css";
import "../../styles/checkbox.css";
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

  return (
    <div className="row">
      <div className=" col-11 col-xxl-4 col-xl-5 col-lg-6 row mx-auto mb-5 text-white ">
        <div className="center-align mx-auto sizehomet bordecitoall py-2 mt-3 imagenn spartan">
          ¿Eres fotógrafo? <br></br>
          <p className="sizehomeb spartan">
            <Link to={"/photographerregister"} className="link">
              Registrarte como fotógrafo
            </Link>{" "}
            para ofrecer tus servicios a la mejor comunidad motera
          </p>
        </div>
        <div className="login-box col-12 mx-auto mt-3 bordecitoall imagenn px-5">
          <div className="bordecito mx-auto col-10 sizehomet center-align mb-5 mt-2 spartan">
            Registro de Usuario
          </div>
          <div>
            <div className="user-box sizehomes ">
              <input
                type="name"
                name="name"
                required
                autoFocus
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
              />
              <label htmlFor="name" className="row">
                <div className="col-2">Usuario &nbsp; </div>

                {inputclickeduser ? (
                  <div className="text-secondary col-10">
                    *Longitud entre 5 y 20 caracteres
                  </div>
                ) : null}
              </label>
              <div>
                {erroruser ==
                "The indicated username is already being used by another user or photographer" ? (
                  <p className="text-danger">*El nombre se encuentra en uso</p>
                ) : null}
              </div>
            </div>
            <div className="user-box sizehomes">
              <input
                type="email"
                name="email"
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
              <label htmlFor="name" className="row">
                <div className="col-2">Email &nbsp; &nbsp;&nbsp; </div>

                {inputclickedemail ? (
                  <div className="text-secondary col-10">
                    *ejemplo@ejemplo.es
                  </div>
                ) : null}
              </label>
              <div>
                {erroremail ==
                "The indicated email is already being used by another user or photographer" ? (
                  <p className="text-danger">
                    *El email indicado ya está siendo utilizado por otro usuario
                    o fotógrafo."
                  </p>
                ) : null}
              </div>
            </div>
            <div className="user-box sizehomes">
              <input
                name="password"
                required
                autoFocus
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
              />
              <label htmlFor="password" className="row">
                <div className="col-4">Contraseña </div>

                {inputclickedpassword ? (
                  <div className="text-secondary col-8">
                    *Ejemplo: Superhero@1
                  </div>
                ) : null}
              </label>
              <div>
                {passworderror ==
                "The entered password is different, please check the password" ? (
                  <>
                    <p className="text-danger">*Las contraseñas no coinciden</p>
                    <p className="text-secondary">
                      *Longitud minima de 8 caracteres, una mayúscula, un número
                      y un carácter especial: '! # $ % & * ? @'
                    </p>
                  </>
                ) : null}
              </div>
            </div>
            <div className="user-box sizehomes">
              <input
                name="password"
                required
                autoFocus
                className=""
                type="password"
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <label htmlFor="confirm_password" className="row">
                <div className="col-12">Confirmar Contraseña </div>
              </label>
              <div>
                {passworderror == true ? (
                  <p className="text-danger">*La contraseña debe coincidir</p>
                ) : null}
              </div>
            </div>
            <div className="sizehomes col-12 row mx-auto centrar mb-4">
              <label class="checkbox-btn ">
                <label className="" for="checkbox ">
                  Acepto los términos y condiciones
                </label>
                <input
                  id="checkbox"
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={handleCheckbox}
                />
                <span class="checkmark mt-1"></span>
              </label>
            </div>
            <div className=" center-align sizehomes">
              <button
                className="botonaco px-4 py-1 text-white"
                onClick={() => {
                  if (!termsAccepted) {
                    alert("Por favor acepta los términos y condiciones.");
                    return;
                  }
                  if (passworderror == false) {
                    sendUserRegister();
                  }
                }}
              >
                <span style={{ "--i": 1 }}>R</span>
                <span style={{ "--i": 2 }}>e</span>
                <span style={{ "--i": 3 }}>g</span>
                <span style={{ "--i": 4 }}>i</span>
                <span style={{ "--i": 5 }}>s</span>
                <span style={{ "--i": 6 }}>t</span>
                <span style={{ "--i": 7 }}>r</span>
                <span style={{ "--i": 8 }}>a</span>
                <span style={{ "--i": 9 }}>r</span>
                <span style={{ "--i": 10 }}>s</span>
                <span style={{ "--i": 11 }}>e</span>
              </button>
            </div>
            <div className=" my-2 center-align">
              <Link className="link" to={"/login"}>
                ¿Ya tienes una cuenta?
              </Link>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
