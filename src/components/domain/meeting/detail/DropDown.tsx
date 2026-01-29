import React from "react";
import { useRef } from "react";
import trashCan from "@assets/trashCan.svg";
import { createPortal } from "react-dom";
import { deleteMeeting } from "@/apis/meeting/meetingAPI";

import styles from "./DropDown.module.scss";
import { useNavigate } from "react-router-dom";
import { useMouseEvent } from "@/hooks/meeting/create/useHandleMouseEvent";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meetingId: string;
}

const DropDown = ({ open, setOpen, meetingId }: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleDeleteBtn = async () => {
    try {
      await deleteMeeting(meetingId);
      navigate("/meeting");
    } catch (e) {
      console.error(e);
    }
  };

  useMouseEvent({ open, setOpen, targetRef });

  if (!open) return null;
  return (
    <div className={styles.dropdownCtn}>
      {open &&
        createPortal(
          <div
            ref={targetRef}
            className={styles.dropdown} // 아래 SCSS 참고
            role="menu"
          >
            <button className={styles.dropdown__deleteBtn} onClick={handleDeleteBtn}>
              <img src={trashCan} alt="trashCan"></img>
              <p>삭제하기</p>
            </button>
          </div>,
          document.getElementById("root") as HTMLElement
        )}
    </div>
  );
};

export default DropDown;
