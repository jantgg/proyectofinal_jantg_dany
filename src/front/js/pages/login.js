import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/registerform.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
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
      await actions.syncuser();
      navigate("/");
    } else {
      setError(true);
    }
  };
  return (
    <section className="h-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block img-registration">
                  <img
                    src="https://rare-gallery.com/uploads/posts/388329-4k-wallpaper.jpg"
                    alt="Sample photo"
                    className="img-fluid"
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">
                      OnBikes Log In for Users
                    </h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="">
                          <input
                            className=""
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => {
                              setError(false);
                              setEmail(e.target.value);
                            }}
                          ></input>
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="">
                          <input
                            className=""
                            name="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                              setError(false);
                              setPassword(e.target.value);
                            }}
                          ></input>
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="button"
                        className="btn btn-warning btn-lg ms-2 text-white"
                        onClick={() => sendLogin()}
                      >
                        <span>Submit form</span>
                      </button>
                      {error ? <p>ERROR CREDENCIALES</p> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
