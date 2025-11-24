import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { BiLinkAlt } from "react-icons/bi";
import styles from "./MeetingSharePage.module.scss";
import { copyToClipboard } from "@/utils/copyToClipBoard";
import { fetchMeetingDetail } from "@/apis/meeting/meetingAPI";
import { getMeetingShareLink } from "@/utils/meetingShare";

const MeetingSharePage = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [shareLink, setShareLink] = useState<string>("링크를 생성중이에요.");

  useEffect(() => {
    if (!meetingId) return;

    fetchMeetingDetail(meetingId)
      .then((data) => {
        setShareLink(getMeetingShareLink(data.meetingCode));
      })
      .catch((error) => {
        console.error("Failed to fetch meeting detail:", error);
        toast.error("미팅 정보를 불러오는데 실패했습니다.", { containerId: "timerClose" });
        setShareLink("링크 생성 실패");
      });
  }, [meetingId]);

  const handleClose = () => {
    navigate("/meeting");
  };

  const handleCopyLink = async () => {
    const ok = await copyToClipboard(shareLink);

    if (ok) {
      toast.success("링크를 복사했습니다!", { containerId: "timerClose" });
    } else {
      toast.error("복사에 실패했어요. 직접 복사해주세요.", { containerId: "timerClose" });
    }
  };

  const handleAddMyTime = () => {
    navigate(`/timetable?meetingId=${meetingId}&pagenum=1`);
  };

  return (
    <div className={styles.meetingSharePage}>
      <div className={styles.header}>
        <IoMdClose className={styles.closeIcon} onClick={handleClose} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>미팅이 생성됐어요!</h1>

        <div className={styles.linkContainer} onClick={handleCopyLink}>
          <span className={styles.linkText}>{shareLink}</span>
          <BiLinkAlt className={styles.linkIcon} />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.addTimeButton} onClick={handleAddMyTime}>
          <span>내 참여시간 추가하기</span>
        </button>
      </div>
    </div>
  );
};

export default MeetingSharePage;
