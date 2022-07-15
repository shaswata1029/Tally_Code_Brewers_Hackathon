import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  clearErrors,
  updateQuiz,
  getQuizDetails,
} from "../../actions/quizAction";
import { UPDATE_QUIZ_RESET } from "../../constants/quizConstants";

import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

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

const UpdateQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizId } = useParams();
  const alert = useAlert();

  const {
    loading: quizLoading,
    error,
    quiz,
  } = useSelector((state) => state.quizDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.quiz);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (quiz && quiz._id !== quizId) {
      dispatch(getQuizDetails(quizId));
    } else {
      setTitle(quiz.title);
      setDescription(quiz.description);
      setCategory(quiz.category);
      setStatus(quiz.status);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Quiz Updated Successfully");
      navigate("/quizzes");
      dispatch({ type: UPDATE_QUIZ_RESET });
      dispatch(getQuizDetails(quizId));
    }
  }, [alert, dispatch, error, isUpdated, navigate, quiz, quizId, updateError]);

  const updateQuizSubmitHandler = (e) => {
    e.preventDefault();

    const quizData = {
      title,
      description,
      category,
      status,
    };

    dispatch(updateQuiz(quizId, quizData));
  };

  return (
    <>
      <MetaData title="Update Quiz" />
      {quizLoading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <SideBar />

            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={updateQuizSubmitHandler}
              >
                <h1>Update Quiz</h1>

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
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
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
                  <select
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
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
                  Update
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateQuiz;
