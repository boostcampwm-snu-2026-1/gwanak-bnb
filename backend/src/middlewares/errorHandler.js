function notFoundHandler(request, response) {
  response.status(404).json({
    message: `${request.method} ${request.originalUrl} 경로를 찾을 수 없습니다.`,
  });
}

function errorHandler(error, _request, response, next) {
  void next;
  const statusCode = error.statusCode || 500;

  response.status(statusCode).json({
    message: error.message || '서버 오류가 발생했습니다.',
  });
}

export { errorHandler, notFoundHandler };
