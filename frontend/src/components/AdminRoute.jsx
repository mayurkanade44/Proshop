import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useSelector((store) => store.auth);
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};
export default AdminRoute;
