import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import { clearErrors, createQuestion } from "../../actions/questionAction";

import { NEW_QUESTION_RESET } from "../../constants/questionConstants";

import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import ListIcon from "@mui/icons-material/List";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "./NewQuiz.css";
import { toUnitless } from "@mui/material/styles/cssUtils";

const NewQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { quizId } = useParams();

  const { loading, error, success } = useSelector((state) => state.newQuestion);

  const [title, setTitle] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [optionFour, setOptionFour] = useState("");
  const [correctOption, setCorrectOption] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Question Created Successfully");
      navigate(`/questions/${quizId}`);
      dispatch({ type: NEW_QUESTION_RESET });
    }
  }, [alert, dispatch, error, navigate, quizId, success]);

  const createQuestionSubmitHandler = (e) => {
    e.preventDefault();

    if (
      optionOne === optionTwo ||
      optionOne === optionThree ||
      optionOne === optionFour ||
      optionTwo === optionThree ||
      optionTwo === optionFour ||
      optionThree === optionFour
    ) {
      alert.error("No Two Options can be same");
      return;
    }

    if (
      correctOption !== optionOne &&
      correctOption !== optionTwo &&
      correctOption !== optionThree &&
      correctOption !== optionFour
    ) {
      alert.error("Correct Option must be among the four options");
      return;
    }

    const options = [];
    options.push({ value: optionOne });
    options.push({ value: optionTwo });
    options.push({ value: optionThree });
    options.push({ value: optionFour });

    const questionData = {
      title,
      correct: correctOption,
      options,
    };

    dispatch(createQuestion(quizId, questionData));
  };

  return (
    <>
      <MetaData title="Create Question" />
      <div className="dashboard">
        <SideBar />

        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createQuestionSubmitHandler}
          >
            <h1>Create Question</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Question Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <ListIcon />
              <input
                type="text"
                required
                placeholder="Option 1"
                value={optionOne}
                onChange={(e) => setOptionOne(e.target.value)}
              />
            </div>

            <div>
              <ListIcon />
              <input
                type="text"
                required
                placeholder="Option 2"
                value={optionTwo}
                onChange={(e) => setOptionTwo(e.target.value)}
              />
            </div>

            <div>
              <ListIcon />
              <input
                type="text"
                required
                placeholder="Option 3"
                value={optionThree}
                onChange={(e) => setOptionThree(e.target.value)}
              />
            </div>

            <div>
              <ListIcon />
              <input
                type="text"
                required
                placeholder="Option 4"
                value={optionFour}
                onChange={(e) => setOptionFour(e.target.value)}
              />
            </div>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Correct Option"
                required
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
              />
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

export default NewQuestion;
