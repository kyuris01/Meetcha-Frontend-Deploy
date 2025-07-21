import React from "react";

import Mymeeting_summary from "./Mymeeting_summary";
import Must_list_container from "./Must_list_container";



import "./Memoir_meeting.scss";

  
const Memoir_meeting_ctn = ({meetingLists}) => {
 
  return (
   <div className="meeting_container">
        <Mymeeting_summary meetingLists={meetingLists}/>
        <Must_list_container meetingLists={meetingLists}/>
   </div>
  );
};

export default Memoir_meeting_ctn;
