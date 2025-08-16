import React, { useEffect, useState } from "react";
import styles from "./MeetingDetailRow.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import ParticipantInfoPage from "../participant/ParticipantInfoPage";
import ReactDOM from "react-dom";
import type { Participant } from "@/apis/meeting/meetingTypes";

interface Props {
  label: string;
  icon: React.ReactNode;
  data: string | number | Participant[];
}

const MeetingDetailRow = ({ label, icon, data }: Props) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isOpen, setIsOpen] = useState(false); // 슬라이더가 열렸는지 여부

  useEffect(() => {
    if (label === "참여자 정보 확인") {
      setParticipants(data as Participant[]);
    }
  }, [data]);

  const handleClick = () => {
    if (label === "참여자 정보 확인") setIsOpen(true);
  };

  const portal = ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1) 백드롭: 클릭 시 닫기 */}
          <motion.div
            key="backdrop"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />

          {/* 2) 슬라이드업 패널: 클릭 이벤트 전파 차단 */}
          <motion.div
            key="panel"
            className={styles.slideUpContainer}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            drag="y"
            dragDirectionLock={true}
            onDragEnd={(_, info) => {
              if (info.offset.y > window.innerHeight * 0.2) {
                setIsOpen(false);
              }
            }}
          >
            <ParticipantInfoPage participants={participants} />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <div className={styles.meetingDetailRow}>
      <div className={styles.meetingDetailRow__leftArea}>
        {icon}
        {label}
      </div>
      <div
        className={
          label === "참여자 정보 확인" ? styles.participantRow : styles.meetingDetailRow__rightArea
        }
        onClick={handleClick}
      >
        {label === "참여자 정보 확인"
          ? participants.map((item, _) => (
              <img
                key={item.participantId}
                className={styles.meetingDetailRow__rightArea__participantImg}
                src={item.profileImageUrl}
              />
            ))
          : (data as string)}
      </div>
      {portal}
    </div>
  );
};

export default MeetingDetailRow;
