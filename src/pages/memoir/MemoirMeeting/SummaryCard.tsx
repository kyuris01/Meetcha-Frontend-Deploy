import React from "react";

import "./MemoirMeeting.scss";

const SummaryCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="summaryCard">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default SummaryCard;
