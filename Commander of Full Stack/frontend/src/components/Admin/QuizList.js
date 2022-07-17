import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";

import { clearErrors, getAllQuizzes } from "../../actions/quizAction";

import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@mui/icons-material/Add";
import "./QuizList.css";

const QuizList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, quizzes } = useSelector((state) => state.quizzes);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllQuizzes());
  }, [alert, dispatch, error, navigate]);

  const columns = [
    { field: "id", headerName: "Quiz ID", minWidth: 200, flex: 0.5 },

    {
      field: "title",
      headerName: "Quiz Title",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "link",
      headerName: "Quiz Link",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 170,
      flex: 0.3,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 180,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/quiz/update/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Link to={`/questions/${params.getValue(params.id, "id")}`}>
              <AddIcon />
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  quizzes &&
    quizzes.forEach((quiz) => {
      rows.push({
        id: quiz._id,
        title: quiz.title,
        link: `localhost:3000/start/quiz/${quiz._id}`,
        category: quiz.category,
        status: quiz.status,
      });
    });

  return (
    <>
      <MetaData title={`ALL QUIZZES`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL QUIZZES</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuizList;
