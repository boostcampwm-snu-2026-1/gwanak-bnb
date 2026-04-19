function notFoundHandler(request, response) {
  response.status(404).json({
    message: "요청한 API를 찾지 못했습니다.",
  });
}

function errorHandler(error, request, response, next) {
  const statusCode = error.statusCode || 500;

  if (response.headersSent) {
    return next(error);
  }

  response.status(statusCode).json({
    message:
      statusCode >= 500
        ? "서버에서 검색 요청을 처리하지 못했습니다."
        : error.message,
  });
}

export { errorHandler, notFoundHandler };
