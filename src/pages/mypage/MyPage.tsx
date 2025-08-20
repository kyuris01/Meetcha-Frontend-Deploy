import React from "react";
import myPageImg from "@/assets/myPage.png";
const MyPage = () => {
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
