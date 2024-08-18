import { STATUS_CODES } from "./status-code";

class BaseError extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly message: string;

  constructor(name: string, status: number, description: string) {
    super(description);
    this.name = name;
    this.status = status;
    this.message = description;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

// 500 Internal Server Error
export class APIError extends BaseError {
  constructor(description = "API Error") {
    super(
      "api internal server error",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      description
    );
  }
}

// 400 Not Found
export class ValidationError extends BaseError {
  constructor(description = "Validation Error") {
    super("validation error", STATUS_CODES.BAD_REQUEST, description);
  }
}

export class AuthorizeError extends BaseError {
  constructor(description = "Unauthorized") {
    super("authorize error", STATUS_CODES.UNAUTHORIZED, description);
  }
}

// 404 Not Found
export class NotFoundError extends BaseError {
  constructor(description = "not found") {
    super(description, STATUS_CODES.NOT_FOUND, description);
  }
}
