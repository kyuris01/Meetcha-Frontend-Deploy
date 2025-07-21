import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  meetingLists: any[];
}
import "./Memoir_meeting.scss";

const Meeting_list_content = ({ meetingLists }: Props) => {
  const navigate = useNavigate();
  const handleClick = (meeting: any) => {
    setTimeout(() => {
    navigate("/memoir-complete", { state: meeting });
  }, 0);
  };
  return (
    <div className="meetings_ctn">
      {Array.isArray(meetingLists) &&
        meetingLists.map((meeting) => {
          return (
            <div
              key={meeting.reflection_id}
              className="meeting_ctn"
              onClick={() => handleClick(meeting)}
            >
              <div className="meeting_intro">
                <div className="meeting_study">{meeting.project_name}</div>
                <p className="meeting_date">{meeting.created_at}</p>
              </div>
              <div className="meeting_main">
                <p className="meeting_title">{meeting.meeting_name}</p>
              </div>
              <div className="meeting_last">
                <p className="meeting_lastWeekDone">{meeting.completed_work}</p>
                <p className="meeting_nextWeekDone">{meeting.planned_work}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Meeting_list_content;
