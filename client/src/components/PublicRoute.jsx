import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { token } = useSelector((state) => state.auth);

  // If logged in → redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise render child route (login/register)
  return <Outlet />;
}
