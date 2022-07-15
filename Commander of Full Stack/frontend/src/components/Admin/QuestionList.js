import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";

import {
  clearErrors,
  getAllQuestionsWithAnswers,
} from "../../actions/questionAction";

// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import "./QuizList.css";

const QuestionList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { quizId } = useParams();

  const { loading, error, questions } = useSelector(
    (state) => state.adminQuestions
  );

  //   const { error: deleteError, isDeleted } = useSelector(
  //     (state) => state.product
  //   );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }

    // if (isDeleted) {
    //   alert.success("Product Deleted Successfully");
    //   navigate("/admin/dashboard");
    //   dispatch({ type: DELETE_PRODUCT_RESET });
    // }

    dispatch(getAllQuestionsWithAnswers(quizId));
  }, [alert, dispatch, error, navigate, quizId]);

  //   const deleteProductHandler = (id) => {
  //     if (window.confirm("Are you sure you want to delete this product?")) {
  //       dispatch(deleteProduct(id));
  //     }
  //   };

  const newQuestionHandler = (e) => {
    e.preventDefault();
    navigate(`/question/create/${quizId}`);
  };

  const columns = [
    { field: "id", headerName: "Question ID", minWidth: 200, flex: 0.5 },

    {
      field: "title",
      headerName: "Question Title",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "option1",
      headerName: "Option One",
      minWidth: 170,
      flex: 0.3,
    },

    {
      field: "option2",
      headerName: "Option Two",
      minWidth: 170,
      flex: 0.3,
    },

    {
      field: "option3",
      headerName: "Option Three",
      minWidth: 170,
      flex: 0.3,
    },

    {
      field: "option4",
      headerName: "Option Four",
      minWidth: 170,
      flex: 0.3,
    },

    {
      field: "correct",
      headerName: "Correct Option",
      minWidth: 200,
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
            <Link to={`/question/update/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={
                () => {}
                // deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  questions &&
    questions.forEach((question) => {
      rows.push({
        id: question._id,
        title: question.title,
        option1: question.options[0].value,
        option2: question.options[1].value,
        option3: question.options[2].value,
        option4: question.options[3].value,
        correct: question.correct,
      });
    });

  return (
    <>
      <MetaData title={`ALL QUESTIONS`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL QUESTIONS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
              <Button
                onClick={newQuestionHandler}
                variant="contained"
                style={{
                  backgroundColor: "tomato",
                  color: "white",
                  width: "40%",
                  margin: "auto",
                }}
              >
                Create New Question
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuestionList;