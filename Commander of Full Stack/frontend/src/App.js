import "./App.css";
import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/layout/Header/Header.js";
import UserOptions from "./components/layout/Header/UserOptions";
import Home from "./components/Home/Home";
import LoginSignUp from "./components/User/LoginSignUp";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import Dashboard from "./components/Admin/Dashboard";
import NewQuiz from "./components/Admin/NewQuiz";
import QuizList from "./components/Admin/QuizList";
import UpdateQuiz from "./components/Admin/UpdateQuiz";
import QuestionList from "./components/Admin/QuestionList";
import NewQuestion from "./components/Admin/NewQuestion";

import WebFont from "webfontloader";
import store from "./store";
import { loadUser } from "./actions/userAction";

function App() {
  const { isAuthenticated, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/login" element={<LoginSignUp />} />

          <Route exact path="/account" element={<ProtectedRoute />}>
            <Route exact path="/account" element={<Profile />} />
          </Route>

          <Route exact path="/me/update" element={<ProtectedRoute />}>
            <Route exact path="/me/update" element={<UpdateProfile />} />
          </Route>

          <Route exact path="/password/update" element={<ProtectedRoute />}>
            <Route exact path="/password/update" element={<UpdatePassword />} />
          </Route>

          <Route exact path="/dashboard" element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route exact path="/quiz/create" element={<ProtectedRoute />}>
            <Route exact path="/quiz/create" element={<NewQuiz />} />
          </Route>

          <Route exact path="/quizzes" element={<ProtectedRoute />}>
            <Route exact path="/quizzes" element={<QuizList />} />
          </Route>

          <Route exact path="/quiz/update/:quizId" element={<ProtectedRoute />}>
            <Route exact path="/quiz/update/:quizId" element={<UpdateQuiz />} />
          </Route>

          <Route exact path="/questions/:quizId" element={<ProtectedRoute />}>
            <Route exact path="/questions/:quizId" element={<QuestionList />} />
          </Route>

          <Route
            exact
            path="/question/create/:quizId"
            element={<ProtectedRoute />}
          >
            <Route
              exact
              path="/question/create/:quizId"
              element={<NewQuestion />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
