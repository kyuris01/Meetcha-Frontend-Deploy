export interface meetingList {
  meetingId: string;
  title: string;
  projectId: string;
  confirmedTime: string;
  meetingStatus: "DONE";
}

export interface memoirList {
  meetingId: string;
  projectId: string;
  projectName: string;
  title: string;
  completedWork: string;
  plannedWork: string;
  confirmedTime: string;
}

export interface meetingSummary {
  totalReflections: number;
  averageContribution: number;
  mostFrequentRole: string;
}

export interface projectTheme {
  text: string;
  bg: string;
}

export type MemoirWithTheme = memoirList & {
  theme: projectTheme;
};

export type MemoirDetail = {
  completedWork: string;
  confirmedTime: string;
  contribution: number;
  description: string;
  meetingId: string;
  plannedWork: string;
  projectId: string;
  projectName: string;
  role: string;
  thought: string;
  title: string;
};

export interface MemoirLocationState {
  refetchMemoirs?: boolean;
}

export interface Project {
  projectId: string;
  projectName: string;
}

export interface PostMemoirPayload {
  contribution: number;
  role: string;
  thought: string;
  completedWork: string;
  plannedWork: string;
  projectId: string;
}

export interface PostMemoirReturn {
  reflectionId: string;
}
