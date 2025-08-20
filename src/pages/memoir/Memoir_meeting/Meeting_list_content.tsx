import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAPIs2 } from "@/apis/useAPIs2";
import "./Memoir_meeting.scss";

interface Props {
  meetingLists: any[];
}

const Meeting_list_content = ({ meetingLists }: Props) => {
  const navigate = useNavigate();

  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(
    null
  );

  // 1. 훅은 최상단에서 선언
  const {
    response: chosenMemoir,
    loading,
    error,
    fire,
  } = useAPIs2(
    selectedMeetingId ? `/meeting/${selectedMeetingId}/reflection` : "",
    "GET",
    undefined,
    true,
    false
  );

  // 2. 클릭 시 선택된 미팅 ID 저장 + fire 실행
  const handleClick = (meeting: any) => {
    setSelectedMeetingId(meeting.meetingId);
  };

  useEffect(() => {
    if (selectedMeetingId) fire(); // ← 최신 URL로 1회만 호출
  }, [selectedMeetingId, fire]);

  // 3. 회고 데이터 도착하면 이동
  useEffect(() => {
    if (chosenMemoir && chosenMemoir.success) {
      navigate("/memoir-complete", { state: chosenMemoir });
    }
  }, [chosenMemoir]);
  console.log(meetingLists);
  return (
    <div className="meetings_ctn">
      {Array.isArray(meetingLists) &&
        [...meetingLists]
          .sort(
            (a, b) =>
              new Date(a.confirmedTime).getTime() -
              new Date(b.confirmedTime).getTime()
          )
          .map((meeting) => {
            return (
              <div
                key={meeting.meetingId}
                className="meeting_ctn"
                onClick={() => handleClick(meeting)}
              >
                <div style={{}} className="meeting_intro">
                  <div
                    style={{
                      color: meeting.theme?.text,
                      backgroundColor: meeting.theme?.bg,
                    }}
                    className="meeting_study"
                  >
                    {meeting.projectName ?? "프로젝트 없음"}
                  </div>
                  <p className="meeting_date">
                    {meeting.confirmedTime.replace("T", " ")}
                  </p>
                </div>
                <div className="meeting_main">
                  <p className="meeting_title">{meeting.title}</p>
                </div>
                <div className="meeting_last">
                  <p className="meeting_lastWeekDone">
                    {meeting.completedWork}
                  </p>
                  <p className="meeting_nextWeekDone">{meeting.plannedWork}</p>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Meeting_list_content;
