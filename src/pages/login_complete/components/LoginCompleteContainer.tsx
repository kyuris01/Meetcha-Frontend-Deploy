import { useEffect } from "react";
import Meetcha_banner from "../../../components/Meetcha_banner";

import "../styles/login_complete.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sendAuthCode } from "@/apis/auth/authAPI";

const LoginCompleteContainer = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    if (!code) return;

    console.log(code.substring(0, 4));

    (async () => {
      try {
        await sendAuthCode(code);
      } catch (e) {
        console.error(e);
      }
    })();

    setTimeout(() => {
      navigate("/schedule");
    }, 5000);
  }, [params]);
  return (
    <div className="login_complete_container">
      <div className="flex_container1">
        <Meetcha_banner />
        <p>로그인이 완료되었습니다.</p>
      </div>
    </div>
  );
};

export default LoginCompleteContainer;
