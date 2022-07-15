import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import { clearErrors, createQuiz } from "../../actions/quizAction";

import { NEW_QUIZ_RESET } from "../../constants/quizConstants";

import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "./NewQuiz.css";
import { toUnitless } from "@mui/material/styles/cssUtils";

const categories = [
  "Science and Technology",
  "History",
  "Geography",
  "Economics",
  "Basic Aptitude",
  "Entertainment",
  "Programming",
];

const statuses = ["draft", "active", "inactive"];

const NewQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newQuiz);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Quiz Created Successfully");
      navigate("/dashboard");
      dispatch({ type: NEW_QUIZ_RESET });
    }
  }, [alert, dispatch, error, navigate, success]);

  const createQuizSubmitHandler = (e) => {
    e.preventDefault();

    const quizData = {
      title,
      description,
      category,
      status,
    };
    dispatch(createQuiz(quizData));
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />

        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createQuizSubmitHandler}
          >
            <h1>Create Quiz</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Quiz Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Quiz Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select required onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <AccountTreeIcon />
              <select required onChange={(e) => setStatus(e.target.value)}>
                <option value="">Choose Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewQuiz;
