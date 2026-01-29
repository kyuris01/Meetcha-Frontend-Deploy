import React from "react";

import "./MemoirMeeting.scss";

import MeetingListContent from "./MeetingListContent";

const MeetingList = ({ memoirLists }) => {
  //어차피 사용자로부터 입력을 받는다.

  return (
    <div className="meetingList_container">
      <div className="list_header">
        <p>미팅 회고 목록</p>
      </div>

      <MeetingListContent memoirLists={memoirLists} />
    </div>
  );
};

export default MeetingList;
