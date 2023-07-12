import { HttpException } from "./http-exception"

export class UnauthorizedException extends HttpException {
  constructor(details?: unknown) {
    super(401, "Unauthorized", details)
  }
}
