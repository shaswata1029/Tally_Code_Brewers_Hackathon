import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { useSelector } from "react-redux";

const Header = () => {
  // const { isAuthenticated } = useSelector((state) => state.user);

  const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Quizzes",
    // link3Text: isAuthenticated ? "Account" : "Login",
    link3Text: "Login",
    link4Text: "Dashboard",
    link1Url: "/",
    link2Url: "/quizzes",
    link3Url: "/login",
    link4Url: "/dashboard",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
  };

  return (
    <>
      <div>
        <ReactNavbar {...options} />
      </div>
    </>
  );
};

export default Header;
