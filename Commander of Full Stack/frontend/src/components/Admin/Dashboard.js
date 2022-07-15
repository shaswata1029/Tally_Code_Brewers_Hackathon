import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// import Chart from "chart.js/auto";
// import { Doughnut, Line } from "react-chartjs-2";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { Typography } from "@material-ui/core";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  return (
    <>
      <MetaData title="Dashboard - Admin Panel" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <Sidebar />

            <div className="dashboardContainer">
              <Typography component="h1">Dashboard</Typography>

              <div className="dashboardSummary">
                <div></div>
                <div className="dashboardSummaryBox2">
                  <Link to="/quizzes">
                    <p>Quizzes</p>
                  </Link>
                  <Link to="/responses">
                    <p>Responses</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
