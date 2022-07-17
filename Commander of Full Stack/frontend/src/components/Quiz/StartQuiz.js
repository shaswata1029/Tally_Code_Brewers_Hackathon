import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

import {
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

import Logo from "../../images/logo.png";

// import AccountTreeIcon from "@material-ui/icons/AccountTree";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import { toUnitless } from "@mui/material/styles/cssUtils";
import Box from "@mui/material/Box";

import { clearErrors, getQuizDetails } from "../../actions/quizAction";
import { getAllQuestions } from "../../actions/questionAction";
import { createResponse } from "../../actions/responseAction.js";

const StartQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { quizId } = useParams();

  const {
    loading: quizLoading,
    error: quizError,
    quiz,
  } = useSelector((state) => state.quizDetails);

  const {
    loading: questionLoading,
    error: questionError,
    questions,
  } = useSelector((state) => state.questions);

  const {
    loading: responseLoading,
    error: responseError,
    response,
  } = useSelector((state) => state.newResponse);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [div1, setDiv1] = useState(true);
  const [div2, setDiv2] = useState(false);
  const [div3, setDiv3] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentResponse, setCurrentResponse] = useState(" ");
  const [responses, setResponses] = useState([]);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (quizError) {
      alert.error(quizError);
      dispatch(clearErrors());
      navigate("/");
    }

    if (questionError) {
      alert.error(questionError);
      dispatch(clearErrors());
      navigate("/");
    }

    if (responseError) {
      alert.error(responseError);
      dispatch(clearErrors());
      navigate("/");
    }

    dispatch(getQuizDetails(quizId));
    dispatch(getAllQuestions(quizId));
  }, [
    alert,
    dispatch,
    navigate,
    quizError,
    questionError,
    responseError,
    quizId,
  ]);

  const createQuizSubmitHandler = (e) => {
    e.preventDefault();

    setDiv1(false);
    setDiv2(true);
  };

  const submitResponseHandler = (e) => {
    e.preventDefault();

    setResponses((responses) => [
      ...responses,
      {
        questionId: questions[currentQuestion]._id,
        responseAnswer: currentResponse,
      },
    ]);

    setCurrentQuestion(currentQuestion + 1);
    setCurrentResponse(" ");
  };

  const submitQuizHandler = (e) => {
    e.preventDefault();

    let responseData = {
      name: name,
      email: email,
      quiz: quizId,
      responses,
    };

    responseData["responses"].push({
      questionId: questions[currentQuestion]._id,
      responseAnswer: currentResponse,
    });

    console.log(responseData);
    setDiv2(false);
    setDiv3(true);
    dispatch(createResponse(quizId, responseData));
  };

  const exitHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      {quizLoading || questionLoading || responseLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Attempt Quiz" />
          {div1 && (
            <div
              style={{
                width: "90%",
                margin: "auto",
                paddingTop: "2rem",
              }}
            >
              <Box
                component="div"
                sx={{
                  height: "auto",
                  backgroundColor: "cyan",
                  border: "0.1rem solid black",
                  borderRadius: "20%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  alignItems: "center",
                }}
              >
                <h2>{`${quiz.title}`}</h2>
                <p>Description: {`   ${quiz.description}`}</p>
                <p>Category: {`   ${quiz.category}`}</p>
                <p>Status: {`   ${quiz.status}`}</p>

                <div
                  className="newProductContainer"
                  style={{
                    margin: "2rem",
                    backgroundColor: "white",
                    width: "70%",
                    height: "60%",
                  }}
                >
                  <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={createQuizSubmitHandler}
                    style={{ height: "60%" }}
                  >
                    <h1>Start Quiz</h1>

                    <div>
                      <FaceIcon />
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div>
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <Button id="createProductBtn" type="submit">
                      Start Quiz
                    </Button>
                  </form>
                </div>

                <form></form>
              </Box>
            </div>
          )}

          {div2 && (
            <>
              <div style={{ marginTop: "5rem" }}>
                <form
                  className="createProductForm"
                  encType="multipart/form-data"
                  onSubmit={
                    currentQuestion === questions.length - 1
                      ? submitQuizHandler
                      : submitResponseHandler
                  }
                >
                  <h3>
                    {`${currentQuestion + 1} : `}
                    {questions[currentQuestion].title}
                  </h3>
                  <p>Marks : +{questions[currentQuestion].marks}</p>

                  <div>
                    {/* <AccountTreeIcon />
                    <select
                      required
                      onChange={(e) => setCurrentResponse(e.target.value)}
                    >
                      <option value="">Choose Your Answer</option>
                      {questions[currentQuestion].options.map(
                        (currentOption) => (
                          <option
                            key={currentOption.value}
                            value={currentOption.value}
                          >
                            {currentOption.value}
                          </option>
                        )
                      )}
                    </select> */}
                    <FormControl>
                      <FormLabel>
                        Choose Your Answer (Note: Skipping this question will
                        not award you with any marks)
                      </FormLabel>
                      <RadioGroup
                        value={currentResponse}
                        onChange={(e) => setCurrentResponse(e.target.value)}
                      >
                        {questions &&
                          questions[currentQuestion].options.map(
                            (currentOption) => (
                              <FormControlLabel
                                value={currentOption.value}
                                control={<Radio />}
                                label={currentOption.value}
                              />
                            )
                          )}

                        <FormControlLabel
                          value=" "
                          control={<Radio />}
                          label="Skip this Question"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <Button id="createProductBtn" type="submit">
                    {currentQuestion === questions.length - 1
                      ? `Submit Quiz`
                      : `Next Question`}
                  </Button>
                </form>
              </div>
            </>
          )}

          {div3 && (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    margin: "5rem",
                    width: "60%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    border: "1px solid black",
                    borderRadius: "1rem",
                    backgroundImage: `url(${Logo})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ marginTop: "1rem" }}
                  >
                    Your ScoreCard :
                  </Typography>

                  <p>
                    {`Total Questions : `}
                    {response && response.responses.length}
                  </p>

                  <p>
                    {`Total Score : `}
                    {response && response.score}
                  </p>
                  <p>
                    {`Correct Answers : `}
                    {response && response.correctAnswers}
                  </p>
                  <p>
                    {`Incorrect Answers : `}
                    {response && response.incorrectAnswers}
                  </p>

                  <p>
                    {`Bonus Marks : `}
                    {response &&
                      (response.correctAnswers > response.incorrectAnswers
                        ? Math.trunc(response.score / 5)
                        : 0)}
                  </p>
                  <Button
                    onClick={exitHandler}
                    variant="contained"
                    style={{
                      backgroundColor: "tomato",
                      color: "white",
                      width: "40%",
                      margin: "1rem",
                    }}
                  >
                    Exit
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StartQuiz;
