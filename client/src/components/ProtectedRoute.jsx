import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { token } = useSelector((state) => state.auth);

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render child routes
  return <Outlet />;
}
