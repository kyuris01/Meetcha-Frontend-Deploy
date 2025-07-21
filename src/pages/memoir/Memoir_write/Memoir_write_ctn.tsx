import React from "react";

import Memoir_write_intro from "./Memoir_write_intro";
import Memoir_write_main from "./Memoir_write_main";
import Memoir_bottom_fixed from "../Memoir_common/Memoir_bottom_fixed";

import "./Memoir_write.scss";

const Memoir_write_ctn = () => {
  return (
    <div className="Memoir_write_ctn">
        <div className="Memoir_content_ctn">
            <Memoir_write_intro/>
            <Memoir_write_main/>
        </div>
            <Memoir_bottom_fixed/>
    </div>
  );
};

export default Memoir_write_ctn;
