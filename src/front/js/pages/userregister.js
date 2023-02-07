import React from "react";
import { Link } from "react-router-dom";
import "../../styles/registerform.css";

export const Userregister = () => {
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
                      OnBikes Registration for Riders or
                      <Link to="/bpr">click here if you're a photographer</Link>
                    </h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1m"
                            className="form-control form-control-lg"
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
                            id="form3Example1n"
                            className="form-control form-control-lg"
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
                        id="form3Example97"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="form3Example97">
                        Email
                      </label>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="button"
                        className="btn btn-light btn-lg text-white"
                      >
                        <span>Reset all</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning btn-lg ms-2 text-white"
                      >
                        <span>Submit form</span>
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
