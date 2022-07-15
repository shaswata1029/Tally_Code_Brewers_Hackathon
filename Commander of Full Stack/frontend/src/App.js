import "./App.css";
import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/layout/Header/Header.js";
import UserOptions from "./components/layout/Header/UserOptions";
import Home from "./components/Home/Home";

import WebFont from "webfontloader";
import store from "./store";

const axios = require("axios");

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
