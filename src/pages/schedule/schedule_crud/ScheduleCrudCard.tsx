import React, { useState } from "react";
import styles from "./ScheduleCrudCard.module.scss";

interface Props {
  icon: React.ReactNode;
  expand: boolean;
  data: string;
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
  BasicComponent: React.ComponentType<any>;
  basicProps?: Record<string, any>;
  ExpandedComponent?: React.ComponentType<{
    onChange: (val: string) => void;
    ampm: boolean;
    minRange: number;
  }>;
}

const ScheduleCrudCard = ({
  icon,
  data,
  dataSetter,
  expand,
  BasicComponent,
  basicProps,
  ExpandedComponent,
}: Props) => {
  const [expandCard, setExpandCard] = useState<boolean>(false);
  const [sharingData, setSharingData] = useState<string>(); // basic과 expand와의 공유데이터
  return (
    <div
      className={
        expand && expandCard
          ? `${styles.active} ${styles.scheduleCrudCard}`
          : styles.scheduleCrudCard
      }
      onClick={() => setExpandCard((prev) => !prev)}
    >
      <div className={styles.scheduleCrudCard__basic}>
        <div className={styles.scheduleCrudCard__basic__icon}>{icon}</div>
        <div className={styles.scheduleCrudCard__basic__data}>
          <BasicComponent {...basicProps} sharingData={sharingData} />
        </div>
      </div>
      {expand && expandCard && (
        <div className={styles.scheduleCrudCard__expanded}>
          <ExpandedComponent
            onChange={(item) => {
              setSharingData(item);
            }}
            ampm={true}
            minRange={5}
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleCrudCard;
