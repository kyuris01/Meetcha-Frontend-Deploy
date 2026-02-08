import "./MyPage.scss";
import { useEffect, useState } from "react";
import { fetchProfileData } from "@/apis/mypage/mypageAPI";
import { logout } from "@/apis/auth/authAPI";
import { useNavigate } from "react-router-dom";
import type { ProfileResponse } from "@/apis/mypage/mypageTypes";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/const/localStorage";

const MyPage = () => {
  const [userData, setUserData] = useState<ProfileResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("유저 데이터를 불러오던 중 오류 발생", error);
      });
  }, []);

  const logoutHandler = () => {
    logout()
      .then(() => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate("/landingPage");
      })
      .catch((error) => {
        console.error("로그아웃 중 오류 발생:", error);
      });
  };

  return (
    <main className="myPage">
      <section className="profileContainer">
        {userData ? (
          <>
            <img className="image" src={userData?.profileImgSrc} alt="profile" />
            <div className="nickname">{userData?.nickname}</div>
          </>
        ) : null}
      </section>
      <section className="featureContainer">
        <div className="featureItem" onClick={() => logoutHandler()}>
          로그아웃
        </div>
      </section>
    </main>
  );
};

export default MyPage;
