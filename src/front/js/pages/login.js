import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/loginform.css";
import "../../styles/forall.css";
import "../../styles/login.css";
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
    <div className="row ">
      <div className="bordecitoall col-3 row mx-auto my-5">
        <div className="login-box col-11 mx-auto mt-3">
          <p className="bordecito col-4 mx-auto">OnBikes</p>
          <form>
            <div className="user-box">
              <input
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
              <label htmlFor="email">Email</label>

            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => {
                  setCredentialsError(false);
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            {credentialserror ? (
              <p className="m-auto text-danger">
                *El email y/o la contraseña son incorrectos.
              </p>
            ) : null}
            <div className="row">
              <button
                className="botonlogin mx-auto mb-3 p-2"
                onClick={() => sendLogin()}
              >
                <span style={{ "--i": 1 }}>I</span>
                <span style={{ "--i": 2 }}>n</span>
                <span style={{ "--i": 3 }}>i</span>
                <span style={{ "--i": 4 }}>c</span>
                <span style={{ "--i": 5 }}>i</span>
                <span style={{ "--i": 6 }}>a</span>
                <span style={{ "--i": 7 }}>r</span>
                <span style={{ "--i": 8 }}>&nbsp;</span>
                <span style={{ "--i": 9 }}>s</span>
                <span style={{ "--i": 10 }}>e</span>
                <span style={{ "--i": 11 }}>s</span>
                <span style={{ "--i": 12 }}>i</span>
                <span style={{ "--i": 13 }}>ó</span>
                <span style={{ "--i": 14 }}>n</span>
              </button>
            </div>
          </form>
          <p>
            ¿No tienes una cuenta aún?{" "}
            <Link to={"/userregister"} className="a2">
              ¡Registrate!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
