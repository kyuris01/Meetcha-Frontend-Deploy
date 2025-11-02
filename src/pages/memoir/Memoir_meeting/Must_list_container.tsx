import React from "react";
import Must_write from "./Must_write";
import Meeting_list from "./Meeting_list";

import "./Memoir_meeting.scss";
const Must_list_container = ({ meetingLists, memoirLists }) => {
  return (
    <div className="list_must_ctn">
      <Must_write meetingLists={meetingLists} />
      <Meeting_list memoirLists={memoirLists} />
    </div>
  );
};

export default Must_list_container;
