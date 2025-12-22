import React from "react";
import { useEffect, useRef } from "react";
import trashCan from "@assets/trashCan.svg";
import { createPortal } from "react-dom";
import { deleteMeeting } from "@/apis/meeting/meetingAPI";

import styles from "./DropDown.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meetingId: string;
}

const DropDown = ({ open, setOpen, meetingId }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleDeleteBtn = async () => {
    console.log("🧨 delete button clicked!", meetingId);
    try {
      const res = await deleteMeeting(meetingId);
      navigate("/meeting");
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, setOpen]);

  if (!open) return null;
  return (
    <div className={styles.dropdownCtn}>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            className={styles.dropdown} // 아래 SCSS 참고
            role="menu"
          >
            <button className={styles.dropdown__deleteBtn} onClick={handleDeleteBtn}>
              <img src={trashCan} alt="trashCan"></img>
              <p>삭제하기</p>
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DropDown;
