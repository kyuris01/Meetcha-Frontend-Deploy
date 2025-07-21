import React from "react";

import "./Memoir_meeting.scss";

const Summary_card = ({title,value}:{title:string;value:string}) => {
  return (
    <div className="summaryCard">
        <div className="title">{title}</div>
        <div className="value">{value}</div>
    </div>
  );
};

export default Summary_card;
