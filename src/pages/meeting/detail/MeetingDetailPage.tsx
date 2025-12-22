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
import { isBefore } from "date-fns";
import DropDown from "./DropDown";
import { getMeetingShareLink } from "@/utils/meetingShare";

const MeetingDetailPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const location = useLocation();
  const { meetingId } = location.state;
  const navigate = useNavigate();
  const [meetingDetail, setMeetingDetail] = useState<MeetingDetail | null>(null);

  const handleToggle = (next: boolean) => {
    setOpen(next);
  };

  const onClickShare = async () => {
    const ok = await copyToClipboard(getMeetingShareLink(meetingDetail?.meetingCode));

    if (ok) {
      toast.success("링크를 복사했습니다", { containerId: "timerClose" });
    } else {
      toast.error("복사에 실패했어요. 직접 복사해주세요.", { containerId: "timerClose" });
    }
  };

  const onClickAlternative = () => {
    navigate(`/alternative/${meetingId}`);
  };

  const onClickEditParticipate = () => {
    navigate(`/timetable?meetingId=${meetingDetail?.meetingId}&pagenum=3`);
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchMeetingDetail(meetingId);
      setMeetingDetail(data);
    };
    load();
  }, [meetingId]);

  return (
    <div className={styles.meetingDetailPage}>
      <Header
        prevButton={true}
        hamburger={meetingDetail?.meetingStatus === "MATCH_FAILED"}
        open={open}
        onToggle={handleToggle}
      />
      <div className={styles.meetingDetailPage__contents}>
        <div className={styles.meetingDetailPage__contents__view}>
          {meetingDetail && <MeetingDetailView data={meetingDetail} />}
        </div>
        <div className={styles.meetingDetailPage__contents__button}>
          {meetingDetail?.meetingStatus === "MATCHING" &&
            isBefore(Date.now(), meetingDetail?.deadline) && (
              <>
                <Button
                  label={"링크 공유하기"}
                  className={styles.shareButton}
                  clickHandler={onClickShare}
                />
                <Button
                  label={"나의 미팅 시간 수정하기"}
                  className={styles.editButton}
                  clickHandler={onClickEditParticipate}
                />
              </>
            )}
          {meetingDetail?.meetingStatus === "MATCHING" &&
            isBefore(meetingDetail?.deadline, Date.now()) && (
              <Button
                label={"대안시간 투표하기"}
                className={styles.editButton}
                clickHandler={onClickAlternative}
              />
            )}
        </div>
      </div>
      <DropDown open={open} setOpen={setOpen} meetingId={meetingId} />
    </div>
  );
};

export default MeetingDetailPage;
