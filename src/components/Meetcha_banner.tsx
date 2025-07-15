import React from "react";

import meetchaImage from ".././assets/MeetchaLogo.svg";

import "./Meetcha_banner.scss";

const Meetcha_banner = () => {
  return (
    <img
      className="meetcha_banner"
      src={meetchaImage}
      alt="meetcha"
    />
  );
};

export default Meetcha_banner;
