import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import "./Participate_timetabe.scss";

import { useNavigate, useLocation } from "react-router-dom";
import Top_banner from "../common/Top_banner";
import Botton_banner_button from "../common/Botton_banner_button";
import Timetable from "./Timetable";
import LeftChevron from "@/assets/LeftChevron.svg";

import { apiCall } from "@/utils/apiCall";

const Participate_timetable_ctn = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { sendAboutMeeting } = location.state || {};
  console.log(sendAboutMeeting);

  const [nickname, setNickname] = useState("");
  const [meetingData, setMeetingData] = useState<any | null>(null);
  const [scheduleData, setScheduleData] = useState<any | null>(null);

  const backtoLink = () => {
    navigate("/link");
  };

  const getUserSchedule = async () => {
    if (!sendAboutMeeting) return;
    try {
      const res = await apiCall(
        `/meeting/id/${sendAboutMeeting.meetingId}`,
        "GET",
        null,
        true
      );

      if (!res) return;
      if (res.code === 404) {
        alert("존재하지 않는 미팅입니다");
      } else if (res.code === 401) {
        alert("인증이 필요합니다");
      } else if (res.code == 200) {
        console.log(res);
        setMeetingData(res.data);
      }
    } catch (e) {
      alert("서버 오류");
    }
  };

  const getUserScheduleData = async () => {
    const candidateDates_length = sendAboutMeeting.candidiateDates.length;
    if (!sendAboutMeeting) return;
    try {
      const resSchedule = await apiCall(
        `/user/schedule?from=${
          sendAboutMeeting.candidateDates[0]
        }T00:00:00&to=${
          sendAboutMeeting.candidateDates[candidateDates_length - 1]
        }23:59:59`,
        "GET",
        null,
        true
      );

      if (!resSchedule) return;
      if (resSchedule.code === 404) {
        alert("날짜 형식이 잘못되었거나 범위가 유효하지 않습니다.");
      } else if (resSchedule.code === 401) {
        alert("로그인이 필요합니다.");
      } else if (resSchedule.code === 404) {
        alert("사용자를 찾을 수 없습니다.");
      } else if (resSchedule.code == 200) {
        console.log(resSchedule);
        setScheduleData(resSchedule.data);
      }
    } catch (e) {
      alert("서버 오류");
    }
  };

  useEffect(() => {
    getUserSchedule();
    getUserScheduleData();
  }, []);

  const handleSetNickname = (e) => {
    setNickname(e.target.value);
  }; //나중에 backend에 post로 보낼예정..


  //memoized된 후보 변수들 왜 memoized??===>요것들은 내가 선택한 후보 시간 정보들이다.
  const memoizedCandidateDates = useMemo(() => {
    return meetingData.candidateDates;
  }, [meetingData.candidateDates]);

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
              <p>{sendAboutMeeting.title}</p>
              <p>{sendAboutMeeting.description}</p>
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
