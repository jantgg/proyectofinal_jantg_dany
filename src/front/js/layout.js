import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Test } from "./pages/test";
import { Result } from "./pages/result";
import { Bestroutes } from "./pages/bestroutes";
import { Bestroutesupload } from "./pages/bestroutesupload";
import { Bp } from "./pages/bp";
import { Bpr } from "./pages/bpr";
import { Bestphotographerupload } from "./pages/bestphotographerupload";
import { User } from "./pages/user";
import { Userphoto } from "./pages/userphoto";
import { Userregister } from "./pages/userregister";
import { Login } from "./pages/login";
import { Loginp } from "./pages/loginp";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Card } from "./component/card";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />

          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Test />} path="/test" />
            <Route element={<Result />} path="/result" />
            <Route element={<Bestroutes />} path="/bestroutes" />
            <Route element={<Bestroutesupload />} path="/bestroutesupload" />
            <Route element={<Bp />} path="/bp" />
            <Route element={<Bpr />} path="/bpr" />
            <Route element={<Login />} path="/login" />
            <Route element={<Loginp />} path="/loginp" />
            <Route
              element={<Bestphotographerupload />}
              path="/bestphotographerupload"
            />
            <Route element={<User />} path="/user" />
            <Route element={<Userphoto />} path="/userphoto" />
            <Route element={<Userregister />} path="/userregister" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
