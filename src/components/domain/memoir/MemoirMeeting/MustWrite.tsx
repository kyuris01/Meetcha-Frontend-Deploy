import React from "react";
import { useNavigate } from "react-router-dom";

import plus from "@/assets/plus.svg";

import "./MemoirMeeting.scss";

const MustWrite = ({ meetingLists }) => {
  const navigate = useNavigate();

  const handleClick = (meeting) => {
    navigate("/memoir-write", {
      state: {
        meeting,
      },
    });
  };
  return (
    <div className="must_write_ctn">
      <p>작성이 필요한 미팅</p>
      <div className="meetingcard_container">
        {Array.isArray(meetingLists) &&
          meetingLists.map((meeting) => (
            <div key={meeting.meetingId} className="meetingcard">
              <p>{meeting.title}</p>
              <p>{meeting.confirmedTime.replace("T", " ")}</p>
              <button className="writeMemoir_button" onClick={() => handleClick(meeting)}>
                <img src={plus} alt="plus"></img>
                <span>회고 작성하기</span>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MustWrite;
