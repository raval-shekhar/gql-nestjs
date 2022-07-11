import React, { FunctionComponent } from "react";
import { Routes, Route } from 'react-router-dom';
import Login from 'containers/Auth/Login';
import Register from 'containers/Auth/Register';
import ProtectedRoutes from "./Dashboard";

interface AppRoutesProps { }

const AppRoutes: FunctionComponent<AppRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
};

export default AppRoutes;