import React, { useEffect, useState, useMemo } from "react";
import "./Participate_timetabe.scss";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import Top_banner from "../common/Top_banner";
import Botton_banner_button from "../common/Botton_banner_button";
import Timetable from "./Timetable";
import LeftChevron from "@/assets/LeftChevron.svg";

import { apiCall } from "@/utils/apiCall";

import type {
  UISlot,
  SubmitAvailabilityBody,
} from "@/apis/participate/participateTypes";

const Participate_timetable_ctn = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { sendAboutMeeting } = location.state || {};
  console.log(sendAboutMeeting);

  const [nickname, setNickname] = useState("");
  const [meetingData, setMeetingData] = useState<any|null>(null);
  const [scheduleData, setScheduleData] = useState<any|null>([]);

  //이 친구는 선택된 시간 데이터들(startAt,endAt)데이터들의 배열임
  const [selectedTimes, setSelectedTimes] = useState<UISlot[]>([]); //  수정됨: 선택된 시간 저장용 state
  const meetingId = (sendAboutMeeting?.meetingId as string) || "";

  const finalPostData: SubmitAvailabilityBody = useMemo(() => {
    const times = selectedTimes
      .map((t) => ({
        startAt: dayjs(t.startISO).format("YYYY-MM-DD HH:mm:ss"),
        endAt: dayjs(t.endISO).format("YYYY-MM-DD HH:mm:ss"),
      }))
      .sort((a, b) => dayjs(a.startAt).valueOf() - dayjs(b.startAt).valueOf());

    const nick = nickname.trim();
    return {
      nickname: nick.length > 0 ? nick : undefined,
      selectedTimes: times,
    };
  }, [selectedTimes, nickname]);

  const backtoLink = () => {
    navigate("/participate");
  };
  //유저의 미팅정보(candidatedate)를 먼저 불러옴
  const getUserMeetingData = async () => {
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
  //유저의 일저 데이터를 불러오는 api연동
  const getUserScheduleData = async () => {
    if (!meetingData) return;

    const sortedDates = [...meetingData.candidateDates].sort();
    const first = sortedDates[0];
    const last = sortedDates[sortedDates.length - 1];

    try {
      const resSchedule = await apiCall(
        `/user/schedule?from=${first}T00:00:00&to=${last}T23:59:59`,
        "GET",
        null,
        true
      );

      if (!resSchedule) return;
      if (resSchedule.code === 400) {
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
    getUserMeetingData();
  }, []);

  useEffect(() => {
    if (!meetingData) return;
    //순서를 정한거임.. 미팅데이터를 먼저 불러와야함(candidate때문)
    getUserScheduleData();
  }, [meetingData]);

  const handleSetNickname = (e) => {
    setNickname(e.target.value);
  }; //나중에 backend에 post로 보낼예정..

  const handleSubmit = async () => {
    if (!meetingId) {
      alert("유효하지 않은 미팅입니다.");
      return;
    }
    if (finalPostData.selectedTimes.length === 0) {
      alert("참여 가능 시간을 최소 1개 이상 선택해주세요.");
      return;
    }

    try {
      const res = await apiCall(
        `/meetings/id/${meetingId}/join`,
        "POST",
        finalPostData,
        true // Authorization 포함(프로젝트 util 정책 유지)
      );

      if (!res) return;

      // 명세에 맞춘 응답 처리
      if (res.code === 200 && res.success) {
        // 참여 성공 후 이동/알림 처리
        alert("미팅 참여 성공!");
        console.log(res);
        navigate("/schedule");
        // navigate(`/meeting/${meetingId}`);
      } else if (res.code === 409) {
        alert("이미 이 미팅에 참가했습니다.");
      } else if (res.code === 400) {
        alert("미팅 참여마감시간이 지났습니다.");
      } else if (res.code === 401) {
        alert("로그인이 필요합니다.");
      } else {
        alert(res.message ?? "참여에 실패했습니다.");
      }
    } catch (e) {
      alert("서버 오류가 발생했습니다.");
    }
  };

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
              <p>{sendAboutMeeting?.title??""}</p>
              <p>{sendAboutMeeting?.description??""}</p>
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
            <Timetable
              candidateDates={meetingData?.candidateDates??[]}
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
              scheduleData={scheduleData}
            />
          </div>
        </div>
      </div>

      <div className="button_ctn">
        <button className="button" onClick={handleSubmit}>
          <div className="button_p_ctn">
            <p>참여하기</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default Participate_timetable_ctn;
