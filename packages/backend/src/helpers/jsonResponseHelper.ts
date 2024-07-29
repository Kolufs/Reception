import { HttpStatusCode } from "../utils/httpStatusCode.js";
import { Response } from "express";

export const sucessJsonRes = (
  res: Response,
  statusCode: HttpStatusCode = HttpStatusCode.Ok,
  message: string = "Success",
  data?: any,
): Record<string, any> => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
    statusCode: statusCode,
  });
};

export const errorJsonRes = (
  res: Response,
  statusCode: HttpStatusCode = HttpStatusCode.InternalServerError,
  message: string = "Failure",
  data?: any,
): Record<string, any> => {
  return res.status(statusCode).json({
    success: false,
    message: message,
    data: data,
  });
};