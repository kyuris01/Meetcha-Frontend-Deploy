/**AuthGuard를 위한 컴포넌트 */
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("access-token");
  const location = useLocation();

  if (!isAuthenticated) {
    const returnRoute = `${location.pathname}${location.search}`;
    alert("로그인이 필요합니다!");
    sessionStorage.setItem("return-route", returnRoute);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
