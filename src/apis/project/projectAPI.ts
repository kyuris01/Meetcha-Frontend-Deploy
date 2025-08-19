import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { Project, ProjectCreate } from "./projectTypes";

export const fetchProjects = async () => {
  const res: ApiResponse<Project[]> = await apiCall("/user/projects", "GET", null, true);
  return res.data;
};

export const createProject = async (data) => {
  const res: ApiResponse<ProjectCreate> = await apiCall("/user/projects", "POST", data, true);
  alert(res.message);
  return res.data;
};
