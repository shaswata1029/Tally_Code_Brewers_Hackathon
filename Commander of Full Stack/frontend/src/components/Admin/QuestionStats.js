import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

import { Typography } from "@mui/material";

import { clearErrors, getQuestionStats } from "../../actions/questionAction";
import { useEffect } from "react";

const QuestionStats = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { questionId } = useParams();

  const {
    loading,
    error,
    questionStats: data,
  } = useSelector((state) => state.questionStats);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      navigate("/dashboard");
    }

    dispatch(getQuestionStats(questionId));
  }, [alert, dispatch, error, navigate, questionId]);

  return (
    <>
      <MetaData title="Statistics" />
      <div style={{ margin: "3rem" }}>
        <Typography variant="h3" align="center">
          Question Statistics
        </Typography>

        {loading ? (
          <Loader />
        ) : (
          <>
            {data && (
              <>
                <div
                  style={{
                    marginTop: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  className="grid mb-10 gap-5"
                >
                  <div>
                    <p>Total Responses</p>
                    <p>{data?.totalResponses}</p>
                  </div>
                  <div>
                    <p>Total Correct Responses</p>
                    <p>{data?.totalCorrectResponses}</p>
                  </div>
                  <div>
                    <p>Total Incorrect Responses</p>
                    <p>{data?.totalIncorrectResponses}</p>
                  </div>
                  <div>
                    <p>Correct Percentage</p>
                    <p>
                      {data?.totalResponses === 0
                        ? 0
                        : Math.round(
                            (data.totalCorrectResponses / data.totalResponses) *
                              100
                          )}{" "}
                      %
                    </p>
                  </div>
                </div>
                {/* <p>{data?.question.title}</p> */}
                <div style={{ marginTop: "1rem" }}>
                  <Typography>{data.title}</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {data.options &&
                    data.options.map((option) => {
                      const percentage =
                        data?.totalResponses === 0
                          ? 0
                          : (option.frequency / data?.totalResponses) * 100;
                      return (
                        <div
                          key={option._id}
                          style={{ gridTemplateColumns: "1fr 60px" }}
                          className="w-full grid mt-4"
                        >
                          <div
                            style={{ zIndex: 100 }}
                            className="py-1 px-2 rounded-r-md relative w-full bg-zinc-700"
                          >
                            <span
                              className="absolute inset-0 rounded-r-full"
                              style={{
                                opacity: 1,
                                zIndex: -1,
                                backgroundColor:
                                  data?.correct === option.value
                                    ? "#4f46e5"
                                    : "#ef4444",
                                width: `${Math.round(percentage)}%`,
                              }}
                            >
                              &nbsp;
                            </span>
                            <p style={{ zIndex: 9 }} className="text-white">
                              {option.value}
                            </p>
                          </div>
                          <p className="justify-self-center">
                            {Math.round(percentage)}%
                          </p>
                        </div>
                      );
                    })}
                </div>
                <div
                  className="grid mt-4"
                  style={{ gridTemplateColumns: "1fr 60px" }}
                ></div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default QuestionStats;
