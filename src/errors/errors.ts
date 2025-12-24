export class UnauthorizedError extends Error {
  message: string;

  constructor() {
    super();
    this.message = "인증실패";
  }
}
