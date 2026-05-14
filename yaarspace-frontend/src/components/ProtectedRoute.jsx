// routes/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuthStore } from "@/store/authStore";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  console.log(user);

  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;