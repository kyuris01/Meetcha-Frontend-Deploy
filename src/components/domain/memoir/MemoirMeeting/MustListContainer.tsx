import React from "react";
import MustWrite from "./MustWrite";
import MeetingList from "./MeetingList";

import "./MemoirMeeting.scss";
const MustListContainer = ({ meetingLists, memoirLists }) => {
  return (
    <div className="list_must_ctn">
      <MustWrite meetingLists={meetingLists} />
      <MeetingList memoirLists={memoirLists} />
    </div>
  );
};

export default MustListContainer;
