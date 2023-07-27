import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((store) => store.auth);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
