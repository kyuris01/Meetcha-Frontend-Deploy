import { useEffect, useRef } from "react";
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

  const {
    response,
    error,
    fire: sendAuthCodeToServer,
  } = useAPIs2(
    "/oauth/google", // 서버가 code를 받아 처리할 엔드포인트
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
    console.log("API 응답:", response);
    console.log("API 오류:", error);

    // ✅ 응답 처리 로직 수정
    if (response) {
      if (response.isSuccess && response.data?.accessToken) {
        sessionStorage.setItem("access-token", response.data.accessToken);
        navigate("/schedule");
      } else if (response.code !== 200) {
        console.error("OAuth 실패:", response.message);
        alert(`로그인 실패: ${response.message}`);
      }

    }
  }, [error, navigate]);


  // 5) 버튼 클릭 → Google 로그인 페이지로 이동

  const handleGoogleLogin = () => {
    // ✅ 환경변수 다시 사용
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent("https://meetcha-frontend-deploy.vercel.app/schedule");

    const scope = encodeURIComponent("openid email profile");

    const responseType = "code";
    const accessType = "offline";
    const prompt = "consent";

    console.log("Google OAuth 설정:");
    console.log("Client ID:", clientId);
    console.log("Redirect URI:", redirectUri);
    console.log("환경변수 전체:", import.meta.env); // ✅ 환경변수 전체 확인

    // ✅ Client ID 검증 추가
    if (!clientId) {
      console.error("VITE_GOOGLE_CLIENT_ID가 설정되지 않았습니다.");
      alert("Google Client ID가 설정되지 않았습니다.");
      return;
    }

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;

    console.log("Auth URL:", authUrl);
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