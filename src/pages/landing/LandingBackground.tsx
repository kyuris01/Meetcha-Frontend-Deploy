import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

import book from "@assets/book.svg";
import alarm from "@assets/alarmClock.svg";
import pen from "@assets/pen.svg";

import "./LandingBackground.scss";

const LandingBackground = () => {
  const navigate = useNavigate();

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
