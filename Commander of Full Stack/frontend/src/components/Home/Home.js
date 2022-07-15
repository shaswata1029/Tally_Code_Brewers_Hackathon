import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const alert = useAlert();

  return (
    <>
      <MetaData title="Quizzy" />
      <div className="banner">
        <p>Welcome to Quizzy</p>
        <h1>CREATE QUIZZES AT YOUR COMFORT</h1>

        <a href="#container">
          <Link to="/login">
            <button>Create a Quiz</button>
          </Link>
        </a>

        <h2 className="homeHeading">Login And Create Awesome Quizzes</h2>
      </div>
    </>
  );
};

export default Home;
