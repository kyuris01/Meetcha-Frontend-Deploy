import React from "react";

import "./Memoir_complete.scss";
import Meeting_card from "../Memoir_common/Meeting_card";

const Memoir_complete_main = ({ meeting }) => {
  console.log(meeting);
  return (
    <div className="memoir_complete_main_ctn">
      <Meeting_card meeting={meeting.data} />
      <div className="ctn_common contribution_role_ctn">
        <div className="contribution">
          <div className="contribution_p">
            <p className="title_text">기여도</p>
          </div>
          <div className="contribution_bar_ctn">
            <div className="contribution_bar">
              <div
                className="fill_bar"
                style={{ width: `${parseFloat(meeting.data.contribution)}%` }}
              ></div>
            </div>
            <p className="contribution_num">{meeting.data.contribution}%</p>
          </div>
        </div>
        <div className="dividend"></div>
        <div className="role_ctn">
          <p className="title_text">역할</p>
          <p className="role">{meeting.data.role}</p>
        </div>
      </div>

      <div className="ctn_common thought_ctn">
        <p className="title_text">느낀 점</p>
        <div className="text_ctn">
          <p className="data">{meeting.data.thought}</p>
        </div>
      </div>

      <div className="ctn_common done_ctn">
        <p className="title_text">한 일</p>
        <div className="text_ctn">
          <p className="data">{meeting.data.completedWork}</p>
        </div>
      </div>

      <div className="ctn_common todo_ctn">
        <p className="title_text">할 일</p>
        <div className="text_ctn">
          <p className="data">{meeting.data.plannedWork}</p>
        </div>
      </div>
    </div>
  );
};

export default Memoir_complete_main;
