import { useEffect, useState } from "react";
import styles from "./MeetingDetailPage.module.scss";
import Header from "@/components/Header";
import MeetingDetailView from "./MeetingDetailView";
import Button from "@/components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import type { MeetingDetail } from "@/apis/meeting/meetingTypes";
import { fetchMeetingDetail } from "@/apis/meeting/meetingAPI";
import { toast } from "react-toastify";
import { copyToClipboard } from "@/utils/copyToClipBoard";

const MeetingDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [meetingDetail, setMeetingDetail] = useState<MeetingDetail | null>(null);

  const onClickShare = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const url = `${API_BASE}/meeting/${state}`;
    const text = meetingDetail ? `[${meetingDetail.title}] 미팅 링크: ${url}` : `미팅 링크: ${url}`;

    const ok = await copyToClipboard(text);

    if (ok) {
      toast.success("링크를 복사했습니다");
    } else {
      toast.error("복사에 실패했어요. 직접 복사해주세요.");
    }
  };

  const onClickEdit = () => {
    navigate(`/alternative/${state}`);
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchMeetingDetail(state);
      console.log("data:", data);
      setMeetingDetail(data);
    };
    load();
  }, []);

  return (
    <div className={styles.meetingDetailPage}>
      <Header prevButton={true} />
      <div className={styles.meetingDetailPage__contents}>
        <div className={styles.meetingDetailPage__contents__view}>
          {meetingDetail && <MeetingDetailView data={meetingDetail} />}
        </div>
        <div className={styles.meetingDetailPage__contents__button}>
          {meetingDetail?.meetingStatus === "MATCHING" && (
            <Button
              label={"링크 공유하기"}
              className={styles.shareButton}
              clickHandler={onClickShare}
            />
          )}
          {meetingDetail?.meetingStatus !== "BEFORE" && (
            <Button
              label={"나의 미팅 시간 수정하기"}
              className={styles.editButton}
              clickHandler={onClickEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailPage;
