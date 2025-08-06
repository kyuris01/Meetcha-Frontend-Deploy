import React, { useState } from "react";
import { useMemo } from "react";
import "./Participate_timetabe.scss";

import { useNavigate,useLocation } from "react-router-dom";
import Top_banner from "../common/Top_banner";
import Botton_banner_button from "../common/Botton_banner_button";
import Timetable from "./Timetable";

import LeftChevron from "@assets/LeftChevron.svg";
const Participate_timetable_ctn = () => {
  const navigate=useNavigate();
  const [nickname, setNickname] = useState("");
  const location = useLocation();
  const { sendAboutMeeting } = location.state || {};
  console.log(sendAboutMeeting);

  const backtoLink=()=>{
    navigate("/link");
  }
  const handleSetNickname = (e) => {
    setNickname(e.target.value);
  }; //나중에 backend에 post로 보낼예정..
  const memoizedCandidateDates = useMemo(() => {
    return sendAboutMeeting.data.candidateDates;
  }, [sendAboutMeeting.data.candidateDates]);
  return (
    <>
      <div className="top_ctn">
    <img src={LeftChevron} alt="LeftChevron" onClick={backtoLink}></img>
    <p>미팅 참가</p>
  </div>
      <div className="participate_ctn">
        <div className="text_container1">
          <div className="meeting_info_ctn">
            <div className="dividend"></div>
            <div className="meeting_info">
              <p>{sendAboutMeeting.data.title}</p>
              <p>{sendAboutMeeting.data.createdAT}</p>
            </div>
          </div>
          <input
            type="text"
            value={nickname}
            onChange={handleSetNickname}
            placeholder="닉네임*"
          ></input>
        </div>

        <div className="timetable">
          <p>
            참여 가능 시간<span>*</span>
          </p>
          <div className="timetable_ctn">
            <Timetable candidateDates={memoizedCandidateDates} />
          </div>
        </div>
      </div>

      <div className="button_ctn">
        <button className="button">
          <div className="button_p_ctn">
            <p>참여하기</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default Participate_timetable_ctn;
