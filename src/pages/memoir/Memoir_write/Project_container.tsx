import React from "react";

import "./Memoir_write.scss";

import LowChevron from "@/assets/LowChevron.svg";

import Plus from "@/assets/plus.svg";

const Project_container = ({ meeting }) => {
  return (
    <div className="ctn_in_common to_write_meeting">
      <p className="write_title">프로젝트</p>
      <div className="project_banner_ctn">
        <div className="in-common banner">
          <div className="banner_name_ctn">
            <p className="banner_name">{meeting.project_name}</p>
          </div>
          <img src={LowChevron} alt="LowChevron"></img>
        </div>
        <div className="in-common banner_box">
          <div className="banner_box_input_ctn">
            <input type="text" className="project_banner_input"></input>
            <img src={Plus} alt="plus"></img>
          </div>
          <div className="checkbox_ctn">
            <input className="study_checkbox" type="checkbox"></input>
            <div className="banner_name_ctn">
              <p className="banner_name">{meeting.project_name}</p>
            </div>
          </div>
          <div className="checkbox_ctn">
            <input className="study_checkbox" type="checkbox"></input>
            <div className="banner_name_ctn">
              <p className="banner_name">{meeting.project_name}</p>
            </div>
          </div>
          <div className="checkbox_ctn">
            <input className="study_checkbox" type="checkbox"></input>
            <div className="banner_name_ctn">
              <p className="banner_name">{meeting.project_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project_container;
