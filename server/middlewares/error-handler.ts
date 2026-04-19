import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  void next;
  console.error(error);

  response.status(500).json({
    message: "서버에서 요청을 처리하지 못했습니다.",
  });
};
