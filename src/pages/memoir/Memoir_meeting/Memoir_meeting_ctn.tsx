import React from "react";

import Mymeeting_summary from "./Mymeeting_summary";
import Must_list_container from "./Must_list_container";

import "./Memoir_meeting.scss";

const Memoir_meeting_ctn = ({ meetingSummary, meetingLists, memoirLists }) => {
  return (
    <div className="meeting_container">
      <Mymeeting_summary
        meetingSummary={meetingSummary}
        memoirLists={memoirLists}
        meetingLists={meetingLists}
      />
      <Must_list_container memoirLists={memoirLists} meetingLists={meetingLists} />
    </div>
  );
};

export default Memoir_meeting_ctn;
