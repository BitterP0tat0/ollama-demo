export class UnauthorizedException extends Error {
  status: number;

  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedException";
    this.status = 401;
    this.message = message;
  }
}
