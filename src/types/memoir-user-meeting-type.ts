// 개별 프로젝트 정보 타입
export interface ProjectInfo {
  projectId: string; // UUID 형식의 고유 식별자
  projectName: string; // 사용자에게 보여줄 이름
}

// 전체 API 응답 타입
export interface ProjectListResponse {
  code: number; // 응답 코드
  message: string; // 응답 메시지
  data: ProjectInfo[]; // 프로젝트 목록 배열
  success: boolean; // 요청 성공 여부
}
