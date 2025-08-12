import React, { useEffect } from "react";
import Meetcha_banner from "../../../components/Meetcha_banner";

import "../styles/login_complete.scss";
import { useNavigate } from "react-router-dom";

const LoginCompleteContainer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/schedule");
    }, 5000);
  }, []);
  return (
    <div className="login_complete_container">
      <div className="flex_container1">
        <Meetcha_banner />
        <p>회원가입이 완료되었습니다.</p>
      </div>
    </div>
  );
};

export default LoginCompleteContainer;
