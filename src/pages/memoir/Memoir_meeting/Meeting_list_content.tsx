import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Memoir_meeting.scss";
import type { MemoirDetail, memoirList } from "@/apis/memoir/memoirTypes";
import { getChosenMemoir } from "@/apis/memoir/memoirAPI";
interface Props {
  memoirLists: memoirList;
}

const Meeting_list_content = ({ memoirLists }: Props) => {
  const navigate = useNavigate();

  const [chosenMemoir, setChosenMemoir] = useState<MemoirDetail | null>(null);

  const load = async (meetingId: string) => {
    const res = await getChosenMemoir(meetingId);
    setChosenMemoir(res);
  };

  // 2. 클릭 시 선택된 미팅 ID 저장 + fire 실행
  const handleClick = (meeting: memoirList) => {
    load(meeting.meetingId);
  };

  // 3. 회고 데이터 도착하면 이동
  useEffect(() => {
    if (chosenMemoir) {
      navigate("/memoir-complete", { state: chosenMemoir });
    }
  }, [chosenMemoir]);
  console.log(memoirLists);
  return (
    <div className="meetings_ctn">
      {Array.isArray(memoirLists) &&
        [...memoirLists]
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
