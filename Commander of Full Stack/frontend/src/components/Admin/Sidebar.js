import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.png";

import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to="/">
          <img src={Logo} alt="Quizzy" />
        </Link>
        <Link to="/dashboard">
          <p>
            <DashboardIcon /> Dashboard
          </p>
        </Link>

        <Link to="">
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem nodeId="1" label="Quizzes">
              <Link to="/quizzes">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>

              <Link to="/quiz/create">
                <TreeItem nodeId="3" label="Create Quiz" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>

        <Link to="/responses">
          <p>
            <ListAltIcon />
            Responses
          </p>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
