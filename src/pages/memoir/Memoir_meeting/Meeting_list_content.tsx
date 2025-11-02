import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "@/apis/apiCall";
import "./Memoir_meeting.scss";
//import { useAPIs2 } from "@/apis/useAPIs2";
interface Props {
  meetingLists: any[];
}

const Meeting_list_content = ({ meetingLists }: Props) => {
  const navigate = useNavigate();

  const [chosenMemoir, setChosenMemoir] = useState<any>();

  // const {
  //   response: chosenMemoir,
  //   loading,
  //   error,
  //   fire,
  // } = useAPIs2(
  //   selectedMeetingId ? `/meeting/${selectedMeetingId}/reflection` : "",
  //   "GET",
  //   undefined,
  //   true,
  //   false
  // );

  const getChosenMemoir = async (meetingId) => {
    try {
      const res = await apiCall(`/meeting/${meetingId}/reflection`, "GET", null, true);

      if (!res) return;
      if (res.code === 401) {
        alert("인증이 필요합니다");
      } else if (res.code === 404) {
        alert("사용자를 찾을 수 없습니다.");
      } else if (res.code === 200) {
        setChosenMemoir(res.data);
      } else {
        alert(res.message ?? "유저 정보를 불러오지 못했습니다.");
      }
    } catch (e) {
      alert("서버 오류");
    }
  };

  // 2. 클릭 시 선택된 미팅 ID 저장 + fire 실행
  const handleClick = (meeting: any) => {
    getChosenMemoir(meeting.meetingId);
  };

  // 3. 회고 데이터 도착하면 이동
  useEffect(() => {
    if (chosenMemoir) {
      navigate("/memoir-complete", { state: chosenMemoir });
    }
  }, [chosenMemoir]);

  console.log(meetingLists);

  return (
    <div className="meetings_ctn">
      {Array.isArray(meetingLists) &&
        [...meetingLists]
          .sort((a, b) => new Date(a.confirmedTime).getTime() - new Date(b.confirmedTime).getTime())
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
                  <p className="meeting_date">{meeting.confirmedTime.replace("T", " ")}</p>
                </div>
                <div className="meeting_main">
                  <p className="meeting_title">{meeting.title}</p>
                </div>
                <div className="meeting_last">
                  <p className="meeting_lastWeekDone">{meeting.completedWork}</p>
                  <p className="meeting_nextWeekDone">{meeting.plannedWork}</p>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Meeting_list_content;
