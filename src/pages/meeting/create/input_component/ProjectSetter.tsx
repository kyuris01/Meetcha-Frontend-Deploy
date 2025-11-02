import styles from "./ProjectSetter.module.scss";
import { useEffect, useState } from "react";
import Plus from "@assets/plus.svg?react";
import type { Project } from "@/apis/project/projectTypes";
import { createProject, fetchProjects } from "@/apis/project/projectAPI";
import { useMeetingCreateForm } from "../hooks/useMeetingCreateForm";

export const ProjectSetter = () => {
  const form = useMeetingCreateForm();
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
          projects.map((item) => (
            <ProjectRow
              key={item.projectId}
              label={item.projectName}
              value={item.projectId}
              onChange={(event) => {
                form.setFormValue("projectId", event.target.value);
              }}
            />
          ))}
      </div>
    </div>
  );
};

const ProjectRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className={styles.projectInputComponentRow}>
      <label className={styles.projectInputComponentRow__buttonContainer}>
        <input type="radio" value={value} onChange={onChange} name="project" />
        <div className={styles.projectInputComponentRow__buttonContainer__projectName}>{label}</div>
      </label>
    </div>
  );
};
