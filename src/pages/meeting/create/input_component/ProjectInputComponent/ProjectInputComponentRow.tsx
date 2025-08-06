import { useState } from "react";
import styles from "./ProjectInputComponentRow.module.scss";

interface Props {
  projectName: string;
  projectId: string;
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectInputComponentRow = ({ projectName, projectId, dataSetter }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dataSetter(event.target.value);
  };
  return (
    <div className={styles.projectInputComponentRow}>
      <label className={styles.projectInputComponentRow__buttonContainer}>
        <input
          type="radio"
          value={`${projectId} ${projectName}`}
          onChange={handleChange}
          name="project"
        />
        <div className={styles.projectInputComponentRow__buttonContainer__projectName}>
          {projectName}
        </div>
      </label>
    </div>
  );
};

export default ProjectInputComponentRow;
