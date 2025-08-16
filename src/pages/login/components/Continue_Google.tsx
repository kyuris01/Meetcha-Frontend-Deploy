import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAPIs2 } from "@/apis/useAPIs2";
import google_logo from "../../../assets/Google.svg";
import "../styles/login.scss";

const Continue_Google = () => {
  const navigate = useNavigate();

  // 배포/로컬 모두 자동 대응되는 콜백 URL
  const redirectUri = `https://meetcha-frontend-deploy.vercel.app/schedule/oauth/google/callback`;

  // 1) URL에서 code 추출 (콜백 시에만 존재)
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  // 2) 수동 실행 훅 (withAuth=false 유지)
  const { response, error, fire: sendAuthCodeToServer } = useAPIs2(
    "/oauth/google",            // 서버가 code를 받아 처리할 엔드포인트
    "POST",
    code ? { code, redirectUri } : undefined, // 서버가 redirectUri 검사하면 함께 전달
    false,
    true
  );

  // 3) StrictMode 대비: 교환 호출은 딱 1번만
  const sentRef = useRef(false);
  useEffect(() => {
    if (code && !sentRef.current) {
      sentRef.current = true;
      sendAuthCodeToServer();
    }
  }, [code, sendAuthCodeToServer]);

  // 4) 응답 처리
  useEffect(() => {
    if (response?.success) {
      // 토큰 저장
      sessionStorage.setItem("access-token", response.data.accessToken);
      if (response.data.refreshToken) {
        localStorage.setItem("refresh-token", response.data.refreshToken);
      }
      // 주소창에서 ?code 제거
      window.history.replaceState({}, "", window.location.pathname);
      // 로그인 후 이동 페이지
      navigate("/schedule", { replace: true });
    } else if (response && !response.success) {
      alert(response.message);
      navigate("/login", { replace: true });
    }
  }, [response, navigate]);

  useEffect(() => {
    if (error) {
      console.error(error);
      alert("로그인에 실패했습니다.");
      navigate("/login", { replace: true });
    }
  }, [error, navigate]);

  // 5) 버튼 클릭 → Google 로그인 페이지로 이동
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // 배포 환경변수에 올바른 "웹 클라이언트 ID" 설정 필수!
    const scope = encodeURIComponent("openid email profile");
    const responseType = "code";
    const accessType = "offline";
    const prompt = "consent";

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=${responseType}` +
      `&scope=${scope}` +
      `&access_type=${accessType}` +
      `&prompt=${prompt}`;

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
