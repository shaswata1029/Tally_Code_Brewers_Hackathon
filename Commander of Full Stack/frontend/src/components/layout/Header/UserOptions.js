import React, { useState } from "react";
import "./Header.css";

import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ProfileImage from "../../../images/Profile.png";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const naviagte = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    {
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    },
    { icon: <ListAltIcon />, name: "Quizzes", func: quizzes },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  function dashboard() {
    naviagte("/dashboard");
  }

  function quizzes() {
    naviagte("/quizzes");
  }
  function account() {
    naviagte("/account");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfull");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : ProfileImage}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
