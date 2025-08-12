import { apiCall } from "@/utils/apiCall";
import styles from "./ProjectInputComponenet.module.scss";
import { useEffect, useRef, useState } from "react";
import Plus from "@assets/plus.svg?react";
import ProjectInputComponentRow from "./ProjectInputComponentRow";

interface ProjectType {
  projectId: string;
  projectName: string;
}

interface Props {
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectInputComponent = ({ dataSetter }: Props) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [inputValue, setInputValue] = useState("");

  const fetchProjects = async () => {
    const response = await apiCall("/user/projects", "GET", null, true);

    console.log("res: ", response);

    switch (response.code) {
      case 200:
        setProjects(response.data);
        break;
      default:
        alert(`${response.message}`);
    }
  };

  const addProjectName = async () => {
    const data = {
      name: inputValue,
    };
    const response = await apiCall("/projects/create", "POST", data, true);

    switch (response.code) {
      case 201:
        alert(response.message);
        setProjects((prev) => [
          ...prev,
          {
            projectId: response.data.projectId,
            projectName: response.data.name,
          },
        ]);
        setInputValue("");
        break;
      default:
        alert(response.message);
    }
    // 생각해보니까 추가버튼 누르면 서버의 데이터에 아예 추가되므로 로컬 플젝 상태따로 저장 안해도될듯
    // setProjects((prev) => [
    //   ...prev,
    //   {
    //     projectId: crypto.randomUUID(),
    //     projectName: inputValue,
    //   },
    // ]);
    // setInputValue("");
  };

  useEffect(() => {
    fetchProjects();
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
