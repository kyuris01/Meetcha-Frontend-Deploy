import React, { useEffect, useState } from "react";
import styles from "./MeetingDetailPage.module.scss";
import Header from "@/components/Header";
import MeetingDetailView from "./MeetingDetailView";
import Button from "@/components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from "@/utils/apiCall";
import type { MeetingDetailType } from "@/types/meeting-data-type";

const MeetingDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [meetingDetail, setMeetingDetail] = useState<MeetingDetailType | null>(null);

  const fetchMeetingDetail = async () => {
    const response = await apiCall(`/meeting-lists/${state}`, "GET", null, true);

    switch (response.code) {
      case 200:
        setMeetingDetail(response.data);
        break;
      default:
        alert(response.message);
    }
  };

  const clickHandler = () => {
    navigate(`/alternative/${state}`);
  };

  useEffect(() => {
    fetchMeetingDetail();
  }, []);

  return (
    <div className={styles.meetingDetailPage}>
      <Header prevButton={true} />
      <div className={styles.meetingDetailPage__contents}>
        <div className={styles.meetingDetailPage__contents__view}>
          {meetingDetail && <MeetingDetailView data={meetingDetail} />}
        </div>
        {meetingDetail?.status !== "SUCCESS" && (
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
