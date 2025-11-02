// import React, { useState } from "react";
// import styles from "./ScheduleCrudCard.module.scss";
// import type { Dispatch, SetStateAction } from "react";

// interface Props {
//   icon: React.ReactNode;
//   expand: boolean;
//   data: string;
//   dataSetter: React.Dispatch<React.SetStateAction<string>>;
//   BasicComponent: React.ComponentType<any>;
//   basicProps?: Record<string, any>;
//   ExpandedComponent?: React.ComponentType<{
//     setStringTime: Dispatch<SetStateAction<string>>;
//   }>;
// }

// const ScheduleCrudCard = ({ icon, data, dataSetter, expand, BasicComponent, basicProps, ExpandedComponent }: Props) => {
//   const [expandCard, setExpandCard] = useState<boolean>(false);
//   const [sharingData, setSharingData] = useState<string>(); // basic과 expand와의 공유데이터
//   return (
//     <div
//       className={expand && expandCard ? `${styles.active} ${styles.scheduleCrudCard}` : styles.scheduleCrudCard}
//       onClick={(e) => {
//         setExpandCard((prev) => !prev);
//       }}
//     >
//       <div className={styles.scheduleCrudCard__basic}>
//         <div className={styles.scheduleCrudCard__basic__icon}>{icon}</div>
//         <div className={styles.scheduleCrudCard__basic__data}>
//           <BasicComponent {...basicProps} sharingData={sharingData} />
//         </div>
//       </div>
//       {expand && expandCard && (
//         <div className={styles.scheduleCrudCard__expanded}>
//           <ExpandedComponent setStringTime={setSharingData} initialTime={basicProps.clickedSpan}/>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScheduleCrudCard;
import React, { useEffect, useState } from "react";
import styles from "./ScheduleCrudCard.module.scss";
import type { ScheduleCreationSchema } from "./schemas/scheduleCreationSchema";
import { useScheduleCreateFormContext } from "./hooks/useScheduleCreateForm";

interface Props {
  icon: React.ReactNode;
  content: React.ReactNode;
  type: keyof ScheduleCreationSchema;
}

const ScheduleCrudCard = ({ icon, content, type }: Props) => {
  const form = useScheduleCreateFormContext();

  return (
    <div
      className={
        form.getFormValue(type) !== "NONE" ? `${styles.active} ${styles.scheduleCrudCard}` : styles.scheduleCrudCard
      }
    >
      <div className={styles.scheduleCrudCard__basic}>
        <div className={styles.scheduleCrudCard__basic__icon}>{icon}</div>
        <div className={styles.scheduleCrudCard__basic__data}>{content}</div>
      </div>
    </div>
  );
};

export default ScheduleCrudCard;
