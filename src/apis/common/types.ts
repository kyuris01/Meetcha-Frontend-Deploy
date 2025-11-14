export interface ApiResponse<T = unknown> {
  timestamp: string;
  path: string;
  code: number;
  message: string;
  data: T;
}
