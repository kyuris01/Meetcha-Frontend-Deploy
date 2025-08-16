export interface Project {
  projectId: string;
  projectName: string;
}

export interface ProjectCreate {
  projectId: string;
  name: string;
  createdAt: string;
}
