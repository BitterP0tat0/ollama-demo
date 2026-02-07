import { CatchError, isHttpResponse } from "@inversifyjs/http-core";
import { ExpressErrorFilter } from "@inversifyjs/http-express";
import { ConsoleLogger } from "@inversifyjs/logger";
import express from "express";
import { Exceptions } from "@packages/shared";
@CatchError()
export class GlobalErrorHandler implements ExpressErrorFilter {
  readonly #logger = new ConsoleLogger("GlobalErrorHandler");
  public catch(
    err: Exceptions,
    _request: express.Request,
    response: express.Response,
  ): void {
    if (isHttpResponse(err)) {
      this.#logger.http(
        `HttpResponse error: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`,
      );
      response.status(err.statusCode).send(err.body);

      return;
    }

    response.status(err.status).json({
      status: err.status,
      name: err.name,
      message: err.message,
    });
  }
}
