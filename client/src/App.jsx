import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./layout/Layout";
import Dashboard from './pages/Dashboard';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SetPassword from "./pages/SetPassword";
import CheckEmail from "./pages/CheckEmail";
import Users from './pages/Users';

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){
  return (
    <Routes>
      {/* Guest-only routes (redirect if logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
      </Route>
      {/* Protected routes (inside layout) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  )
}