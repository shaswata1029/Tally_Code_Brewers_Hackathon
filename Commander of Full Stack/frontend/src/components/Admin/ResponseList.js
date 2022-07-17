import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { CSVLink, CSVDownload } from "react-csv";

import { clearErrors, getAllResponses } from "../../actions/responseAction";

import { Button } from "@material-ui/core";
import Star from "@material-ui/icons/Star";
import "./ResponseList.css";

const ResponseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, loading, responses } = useSelector((state) => state.responses);

  const [quizId, setQuizId] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, navigate, quizId, error]);

  const responsesSubmitHandler = (e) => {
    e.preventDefault();

    if (quizId.length !== 24) {
      alert.error("Quiz ID must be 24 characters long");
      return;
    }

    dispatch(getAllResponses(quizId));
  };

  const columns = [
    { field: "id", headerName: "Response ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "score",
      headerName: "Score",
      type: "number",
      minWidth: 180,
      flex: 0.4,
    },

    {
      field: "correctAnswers",
      headerName: "Correct Answers",
      type: "number",
      minWidth: 210,
      flex: 0.4,
    },

    {
      field: "incorrectAnswers",
      headerName: "Incorrect Answers",
      type: "number",
      minWidth: 210,
      flex: 0.4,
    },
  ];

  const rows = [];

  const headers = [
    { label: "Response ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Score", key: "score" },
    { label: "Correct Answers", key: "correctAnswers" },
    { label: "Incorrect Answers", key: "incorrectAnswers" },
  ];

  responses &&
    responses.forEach((response) => {
      rows.push({
        id: response._id,
        name: response.name,
        email: response.email,
        score: response.score,
        correctAnswers: response.correctAnswers,
        incorrectAnswers: response.incorrectAnswers,
      });
    });

  return (
    <>
      <MetaData title={`ALL RESPONSES`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <SideBar />
            <div className="productReviewsContainer">
              <form
                className="productReviewsForm"
                onSubmit={responsesSubmitHandler}
              >
                <h1 className="productReviewsFormHeading">ALL RESPONSES</h1>

                <div>
                  <Star />
                  <input
                    type="text"
                    placeholder="Quiz Id"
                    required
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                  />
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || quizId === "" ? true : false
                  }
                >
                  Search
                </Button>
              </form>
              {responses && responses.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              ) : (
                <h1 className="productReviewsFormHeading">
                  No Responses Found
                </h1>
              )}

              {responses && responses.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CSVLink
                    data={rows}
                    headers={headers}
                    filename={"responses.csv"}
                    style={{
                      backgroundColor: "tomato",
                      color: "white",
                      width: "40%",
                      margin: "auto",
                      height: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textDecoration: "none",
                      borderRadius: "5%",
                    }}
                  >
                    Download As CSV
                  </CSVLink>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResponseList;
