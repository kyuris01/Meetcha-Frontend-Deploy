import React, { useRef, useState, useEffect } from "react";
import "./Meeting_card.scss";
import LowChevron from "@assets/LowChevron.svg";

const Meeting_card = ({
  meeting,
  chosenProject,
  chosenProjectBgColor,
  setChosenProject,
  chosenProjectTextColor,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [descHeight, setDescHeight] = useState(0);
  const descRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  console.log(chosenProject);
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
          <div style={{ backgroundColor: chosenProjectBgColor }} className="p_container">
            <p
              style={{
                color: chosenProjectTextColor,
              }}
            >
              {(chosenProject ?? "").trim() || "프로젝트 없음"}
            </p>
          </div>
        </div>
        <p>{meeting.title}</p>
        <p>{meeting.confirmedTime.replace("T", " ")}</p>

        <div
          className="description"
          ref={descRef}
          style={{
            maxHeight: isExpanded ? `${descHeight}px` : "2.4rem",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          {meeting.description || "이 미팅은 설명이 없습니다."}
        </div>

        <div className="expand_btn" onClick={toggleExpand}>
          <img src={LowChevron} alt="펼치기" className={isExpanded ? "rotated" : ""} />
        </div>
      </div>
    </div>
  );
};

export default Meeting_card;
