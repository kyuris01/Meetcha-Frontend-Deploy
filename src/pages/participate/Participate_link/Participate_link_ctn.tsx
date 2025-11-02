import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Participate_link.scss";

import LeftChevron from "@assets/LeftChevron.svg";

import { apiCall } from "@/utils/apiCall";
//여기서 meetingcode를 가진 meetingdata를 불러와야함
//msw사용

interface MeetingData {
  meetingId: string;
  title: string;
  description: string;
  deadline: string;
  isClosed: boolean;
}

interface aboutMeeting {
  isSuccess: boolean;
  code: number;
  message: string;
  data: MeetingData;
}

const Participate_link = () => {
  const top_text = "미팅 참가";
  const navigate = useNavigate();

  const [linkText, setLinkText] = useState<string>("");

  const handletextchange = (e) => {
    setLinkText(e.target.value);
  };

  const requestLinkCheck = async () => {
    const code = linkText.trim(); // 공백 제거
    if (!code) return; // 빈 값 방지

    try {
      const res = await apiCall(
        `/meeting/code/${encodeURIComponent(code)}`, // ← 복수형 + 슬러그
        "GET",
        null,
        true // 인증 필요
        // ← GET이므로 data 인자 넣지 않음!
      );

      if (!res) return;

      if (res.code === 400) {
        navigate("/complete");
      } else if (res.code === 200) {
        navigate(`/timetable?meetingId=${res.data.meetingId}&pagenum=2`);
      } else {
        // 404 등
        navigate("/error");
      }
    } catch (e) {
      // 500 등 서버 에러
      navigate("/error");
    }
  };
  // 사용: 버튼 클릭 전에 일단 한 번 호출
  // debugMeetingCode(linkText);

  return (
    <div className="partici_link_ctn">
      <div className="top_ctn">
        <img
          src={LeftChevron}
          alt="LeftChevron"
          onClick={() => {
            navigate("/schedule");
          }}
        ></img>
        <p>{top_text}</p>
      </div>
      <div className="partici_link_main">
        <div className="p_input_ctn">
          <p>
            공유받은 링크로
            <br />
            미팅에 참여할 수 있어요
          </p>
          <input
            type="text"
            value={linkText}
            onChange={handletextchange}
            placeholder="링크 입력 및 붙여넣기"
          ></input>
        </div>
      </div>

      <div className="button_ctn">
        <button className="button" onClick={requestLinkCheck}>
          <div className="button_p_ctn">
            <p>다음</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Participate_link;
