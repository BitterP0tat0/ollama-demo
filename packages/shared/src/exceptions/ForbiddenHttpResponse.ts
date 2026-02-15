export class ForbiddenHttpResponse extends Error {
  status: number;
  constructor(message: string = "Forbidden") {
    super(message);
    this.name = "ForbiddenHttpResponse";
    this.status = 403;
  }
}
