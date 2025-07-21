import React, { useRef, useState, useEffect } from "react";
import "./Meeting_card.scss"
import LowChevron from "@assets/LowChevron.svg";

const Meeting_card = ({ meeting }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [descHeight, setDescHeight] = useState(0);
  const descRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (descRef.current) {
      setDescHeight(descRef.current.scrollHeight);
    }
  }, [meeting]);

  return (
    <div className="study_info">
      <div className="spare_ctn"></div>
      <div className="study_banner_ctn">
        <div className="project_name">
          <div className="p_container">
            <p>{meeting.project_name}</p>
          </div>
        </div>
        <p>{meeting.meeting_name}</p>
        <p>{meeting.created_at}</p>
       
        <div
          className="description"
          ref={descRef}
          style={{
            maxHeight: isExpanded ? `${descHeight}px` : "2.4rem",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          {meeting.thought || "이 미팅은 설명이 없습니다."}
        </div>

        <div className="expand_btn" onClick={toggleExpand}>
          <img
            src={LowChevron}
            alt="펼치기"
            className={isExpanded ? "rotated" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Meeting_card;
