import { useEffect } from "react";
import Meetcha_banner from "../../../components/Meetcha_banner";
import Continue_Google from "./Continue_Google";
import Continue_des from "./Continue_des";

import "../styles/login.scss";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("access-token")) {
      navigate("/schedule");
    }
  }, []);
  return (
    <div className="login_container">
      <div className="flex_container1">
        <Meetcha_banner />
        <div className="flex_container2">
          <Continue_Google />
          <Continue_des />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
