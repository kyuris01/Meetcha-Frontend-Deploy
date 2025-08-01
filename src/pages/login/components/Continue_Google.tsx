import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAPIs } from "@/apis/useAPIs";
import google_logo from "../../../assets/Google.svg";
import "../styles/login.scss";

const Continue_Google = () => {
  const navigate = useNavigate();

  //1. URL에서 code 추출
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  //2. API 훅 구성: 수동 실행 모드
  const {
    response,
    loading,
    error,
    fire: sendAuthCodeToServer,
  } = useAPIs(
    "/oauth/google", // 서버가 code를 받아 처리할 엔드포인트
    "POST",
    code ? { code } : undefined,
    false,
    true
  );

  //3. code가 생기면 서버로 전송
  useEffect(() => {
    if (code) {
      console.log("Google code:", code);
      sendAuthCodeToServer();
    }
  }, [code]);

  //4. 응답 처리
  useEffect(() => {
    console.log("API 응답:", response);
    console.log("API 오류:", error); // ✅ 에러 메시지 확인
    if (response?.isSuccess) {
      sessionStorage.setItem("access-token", response.data.accessToken);
      navigate("/login_complete");
    } else if (response && !response.isSuccess) {
      alert(response.message);
    }
  }, [response]);

  //5. 버튼 클릭 → Google 로그인 페이지로 이동
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent("http://localhost:5173/Login"); // Google 콘솔에 등록한 리디렉션 URI
    const scope = encodeURIComponent("openid email profile");
    const responseType = "code";
    const accessType = "offline";
    const prompt = "consent";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;

    window.location.href = authUrl;
  };

  return (
    <button className="google_button" onClick={handleGoogleLogin}>
      <img src={google_logo} alt="google_logo" />
      <p>Sign in with Google</p>
    </button>
  );
};

export default Continue_Google;
