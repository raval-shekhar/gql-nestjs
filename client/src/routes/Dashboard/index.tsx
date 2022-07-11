import { Route, Navigate, Routes } from "react-router-dom";
import MainLayout from 'containers/MainLayout';
import { getToken } from 'redux/selectors/auth'
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const authUser = useSelector(getToken);
  return (
    <>
      {authUser ? (
        <Routes>
          {/* Dashboard Route */}
          <Route path="/dashboard" element={<MainLayout />} />
        </Routes>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;