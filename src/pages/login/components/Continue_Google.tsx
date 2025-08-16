// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAPIs2 } from "@/apis/useAPIs2";
// import google_logo from "../../../assets/Google.svg";
// import "../styles/login.scss";

// const Continue_Google = () => {
//   const navigate = useNavigate();

//   //1. URL에서 code 추출
//   const urlParams = new URLSearchParams(window.location.search);
//   const code = urlParams.get("code");

//   //2. API 훅 구성: 수동 실행 모드
//   const {
//     response,
//     loading,
//     error,
//     fire: sendAuthCodeToServer,
//   } = useAPIs2(
//     "/oauth/google", // 서버가 code를 받아 처리할 엔드포인트
//     "POST",
//     code ? { code } : undefined,
//     false,
//     true
//   );

//   //3. code가 생기면 서버로 전송
//   useEffect(() => {
//     if (code) {
//       console.log("Google code:", code);
//       sendFuthCodeToServer();
//     }
//   }, [code]);

//   //4. 응답 처리
//   useEffect(() => {
//     console.log("API 응답:", response);
//     console.log("API 오류:", error); // ✅ 에러 메시지 확인
//     if (response?.success) {
//       sessionStorage.setItem("access-token", response.data.accessToken);
//       navigate("/schedule");
//     } else if (response && !response.isSuccess) {
//       alert(response.message);
//     }
//   }, [response]);

//   //5. 버튼 클릭 → Google 로그인 페이지로 이동
//   const handleGoogleLogin = () => {
//     const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//     const redirectUri = encodeURIComponent("https://meetcha-frontend-deploy.vercel.app/schedule"); // Google 콘솔에 등록한 리디렉션 URI
//     const scope = encodeURIComponent("openid email profile");
//     const responseType = "code";
//     const accessType = "offline";
//     const prompt = "consent";

//     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;

//     window.location.href = authUrl;
//   };

//   return (
//     <button className="google_button" onClick={handleGoogleLogin}>
//       <img src={google_logo} alt="google_logo" />
//       <p>Sign in with Google</p>
//     </button>
//   );
// };

// export default Continue_Google;

import { useEffect } from "react";
import google_logo from "../../../assets/Google.svg";
import { sendAuthCode } from "@/apis/auth/authAPI";

const Continue_Google = () => {
  let authCode = null;

  useEffect(() => {
    sendAuthCode(authCode);
  }, [authCode]);

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      "https://meetcha-frontend-deploy.vercel.app/login-complete"
    ); // Google 콘솔에 등록한 리디렉션 URI
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
