export class UnauthorizedError extends Error {
  message: string;

  constructor() {
    super();
    this.message = "인증실패";
  }
}

export class NetworkError extends Error {
  message: string;

  constructor() {
    super();
    this.message = "네트워크 에러";
  }
}
