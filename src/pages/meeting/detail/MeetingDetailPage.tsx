import React, { useState } from "react";
import styles from "./MeetingDetailPage.module.scss";
import Header from "@/components/Header";
import MeetingDetailView from "./MeetingDetailView";
import Button from "@/components/Button";
import { useLocation, useNavigate } from "react-router-dom";

const MeetingDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);

  const clickHandler = () => {
    navigate(`/alternative/${state.meeting_id}`);
  };

  return (
    <div className={styles.meetingDetailPage}>
      <Header prevButton={true} />
      <div className={styles.meetingDetailPage__contents}>
        <div className={styles.meetingDetailPage__contents__view}>
          <MeetingDetailView data={state} />
        </div>
        {state.meetingState !== "진행중" && (
          <Button
            label={"나의 미팅 시간 수정하기"}
            className={styles.button}
            clickHandler={clickHandler}
          />
        )}
      </div>
    </div>
  );
};

export default MeetingDetailPage;
