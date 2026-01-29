import { fetchProfileData } from "@/apis/mypage/mypageAPI";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/const/localStorage";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

/**
 * 이미 로그인한 유저가 볼 필요 없는 페이지에 대해, 내 일정 페이지로 리다이렉트
 */
export const AlreadyAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        return;
      }

      fetchProfileData()
        .then(() => {
          navigate("/schedule");
        })
        .catch(() => {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
        });
    };

    verifyAuth();
  }, [navigate]);

  return <Outlet />;
};
