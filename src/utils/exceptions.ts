import { StatusCodes } from "http-status-codes";

export class BaseError extends Error {
  statusCode: number;
  message: string;
  meta: Record<string, unknown>

  constructor(name: string, message: string, statusCode: number) {
    super(`${name}: ${message}`);
    this.meta = {
      name: name,
      message: message,
      statusCode: statusCode
    }
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class BusinessError extends BaseError {
  constructor(message: string) {
    super("Business Error", message, StatusCodes.NOT_ACCEPTABLE);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super("Not Found Error", message, StatusCodes.NOT_FOUND);
  }
}

export class SchemaValidatorError extends BaseError {
  constructor(message: string) {
    super("Schema Validator Error", message, StatusCodes.BAD_REQUEST);
  }
}

export class TransactionError extends BaseError {
  constructor(message: string) {
    super("Transaction Error", message, StatusCodes.BAD_REQUEST);
  }
}
