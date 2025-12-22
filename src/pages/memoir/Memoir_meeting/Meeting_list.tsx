import React from "react";

import "./Memoir_meeting.scss";

import Meeting_list_content from "./Meeting_list_content";

const Meeting_list = ({ memoirLists }) => {
  //어차피 사용자로부터 입력을 받는다.

  return (
    <div className="meetingList_container">
      <div className="list_header">
        <p>미팅 회고 목록</p>
      </div>

      <Meeting_list_content memoirLists={memoirLists} />
    </div>
  );
};

export default Meeting_list;
