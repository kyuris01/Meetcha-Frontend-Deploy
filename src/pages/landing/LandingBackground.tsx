import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

import book from "@assets/book.svg";
import alarm from "@assets/alarmClock.svg";
import pen from "@assets/pen.svg";

import "./LandingBackground.scss";
import { fetchProfileData } from "@/apis/mypage/mypageAPI";

const LandingBackground = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("access-token");

      if (!token) {
        return;
      }

      fetchProfileData()
        .then(() => {
          navigate("/schedule");
        })
        .catch(() => {
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
        });
    };

    verifyAuth();
  }, []);

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="backgroundContainer">
      <img src={book} alt="book"></img>
      <img src={alarm} alt="alarm"></img>
      <img src={pen} alt="pen"></img>
      <LandingPage />
      <div className="button_ctn">
        <button className="button" onClick={handleClick}>
          <div className="button_p_ctn">
            <p>시작하기</p>
          </div>
        </button>
      </div>
      <footer>
        <a href="/privacy" className="privacyBtn">
          개인정보 처리방침
        </a>
      </footer>
    </div>
  );
};

export default LandingBackground;
