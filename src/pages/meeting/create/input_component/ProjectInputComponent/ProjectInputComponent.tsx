import styles from "./ProjectInputComponenet.module.scss";
import { useEffect, useRef, useState } from "react";
import Plus from "@assets/plus.svg?react";
import ProjectInputComponentRow from "./ProjectInputComponentRow";
import type { Project } from "@/apis/project/projectTypes";
import { createProject, fetchProjects } from "@/apis/project/projectAPI";

interface Props {
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectInputComponent = ({ dataSetter }: Props) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addProjectName = async () => {
    const data = {
      name: inputValue,
    };
    const response = await createProject(data);

    setProjects((prev) => [
      ...prev,
      {
        projectId: response.projectId,
        projectName: response.name,
      },
    ]);
    setInputValue("");
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    load();
  }, []);

  return (
    <div className={styles.projectInputComponent}>
      <div className={styles.projectInputComponent__inputSection}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.projectInputComponent__inputSection__inputTag}
        />
        <Plus
          onClick={addProjectName}
          className={styles.projectInputComponent__inputSection__addBtn}
        />
      </div>
      <div className={styles.projectInputComponent__listSection}>
        {projects &&
          projects.map((item, _) => (
            <ProjectInputComponentRow
              key={item.projectId}
              projectName={item.projectName}
              projectId={item.projectId}
              dataSetter={dataSetter}
            />
          ))}
      </div>
    </div>
  );
};

export default ProjectInputComponent;
