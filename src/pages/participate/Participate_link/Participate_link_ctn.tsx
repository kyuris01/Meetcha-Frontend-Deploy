import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Participate_link.scss";

import Top_banner from "../common/Top_banner";

import { useAPIs2 } from "@/apis/useAPIs2";
import { useAPIs } from "@/apis/useAPIs";
//여기서 meetingcode를 가진 meetingdata를 불러와야함
//msw사용



const Participate_link = () => {
  const top_text = "미팅 참가";
  const navigate = useNavigate();

  const [linkText, setLinkText] = useState<string>("");

  const handletextchange = (e) => {
    setLinkText(e.target.value);
  };

  const {
    response: aboutMeeting,
    loading,
    error,
    fire
  } = useAPIs(
    `/participate_list`,
    "GET",
    undefined,
    false,
    true
  );

  const handleLinkCheck = () => {
  if (!linkText.trim()) return;
  fire(); // → 응답 도착하면 useEffect에서 처리
};

// 🔄 aboutMeeting 이 변경될 때 검사
useEffect(() => {
  if (!aboutMeeting || !Array.isArray(aboutMeeting)) return;

  const foundMeeting = aboutMeeting.find(
    (meeting) => meeting?.data?.meetingCode === linkText
  );

  if (!foundMeeting) {
    navigate("/error");
    return;
  }

  if (foundMeeting.code === 410) {
    navigate("/complete");
  } else if (foundMeeting.code === 200) {
    navigate("/timetable", {
      state: {
        sendAboutMeeting: foundMeeting,
      },
    });
  } else {
    navigate("/error");
  }
}, [aboutMeeting]);


  return (
    <div className="partici_link_ctn">
      <Top_banner text={top_text} />
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
        <button className="button" onClick={handleLinkCheck}>
          <div className="button_p_ctn">
            <p>다음</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Participate_link;
