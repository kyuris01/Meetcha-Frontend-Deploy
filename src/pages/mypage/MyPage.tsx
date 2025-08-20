import React, { useEffect } from "react";
import myPageImg from "@/assets/myPage.png";
import "./MyPage.scss";
import { apiCall } from "@/apis/apiCall";
import { useState } from "react";
const MyPage = () => {
  const [userData,setUserData]=useState<any>();
  const getUserData = async () => {
      
      try {
        const res = await apiCall(`/user/mypage`, "GET", null, true);
  
        if (!res) return;
        if (res.code === 404) {
          alert("존재하지 않는 미팅입니다");
        } else if (res.code === 401) {
          alert("인증이 필요합니다");
        } else if (res.code == 200||res.code==201) {
          console.log(res);
          setUserData(res);
        }
      } catch (e) {
        alert("서버 오류");
      }
    };
    useEffect(() => {
        getUserData();
        console.log(userData);
      }, []);
  return (
    <div className="myPage_ctn">
      <div className="myPage_nickname">
        <div className="img_ctn">
            <img className="myPageImg" src={myPageImg} alt="myPageImg"></img>
        </div>
        <div className="nickname_ctn">
            <p className="nickname_text">닉네임</p>
            <p className="nickname">Kuit Meetcha</p>
        </div>
      </div>
      <div className="myPage_information">무엇을 입력할까요?</div>
    </div>
  );
};

export default MyPage;
