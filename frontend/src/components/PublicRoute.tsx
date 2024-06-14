import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuth = localStorage.getItem("token");
  return isAuth ? <Navigate to="/blogs" /> : <Outlet />;
};

export default PublicRoute;
