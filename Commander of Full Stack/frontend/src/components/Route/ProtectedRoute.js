import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {loading === true ? (
        <Navigate to="/login" />
      ) : !isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ProtectedRoute;
