import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";
import { useNavigate } from "react-router-dom";

export const Bpr = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [sunday, setSunday] = useState("");
  const [service, setService] = useState("");
  const [error, setError] = useState(false);
  const sendBpr = async () => {
    const response = await fetch(store.backendurl + "bpr", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
        email: email,
        password: password,
        location: location,
        instagram: instagram,
        sunday: sunday,
        error: error,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/login");
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
                      OnBikes Registration for Photographers
                    </h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            className="form-control form-control-lg"
                            placeholder="Username"
                            value={user_name}
                            onChange={(e) => {
                              setError(false);
                              setUserName(e.target.value);
                            }}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1m"
                          >
                            User name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                              setError(false);
                              setPassword(e.target.value);
                            }}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1n"
                          >
                            Password
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="email"
                        value={email}
                        onChange={(e) => {
                          setError(false);
                          setEmail(e.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="form3Example97">
                        Email
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Localización"
                        value={location}
                        onChange={(e) => {
                          setError(false);
                          setLocation(e.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="form3Example97">
                        Provincia/Ciudad de trabajo
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="@instagram"
                        value={instagram}
                        onChange={(e) => {
                          setError(false);
                          setInstagram(e.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="form3Example97">
                        Instagram
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Servicios"
                        value={service}
                        onChange={(e) => {
                          setError(false);
                          setService(e.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="form3Example97">
                        Servicios
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Lugar Favorito"
                        value={sunday}
                        onChange={(e) => {
                          setError(false);
                          setSunday(e.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="form3Example97">
                        ¿Donde pueden encontrarte los domingos?
                      </label>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="button"
                        className="btn btn-warning btn-lg ms-2 text-white"
                        onClick={() => sendBpr()}
                      >
                        <span>Submit form</span>
                        {error ? <p>Usuario ya registrado</p> : null}
                      </button>
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
