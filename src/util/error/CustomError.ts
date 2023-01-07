import { errorCode } from "../util";

export class CustomError<T> extends Error {
  code: number = errorCode;
  payload: T | null = null;

  constructor(code: number, msg: string, payload: T) {
    super(msg);
    this.code = code;
    this.payload = payload;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
