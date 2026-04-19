export function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'

  if (statusCode >= 500) {
    console.error(error)
  }

  response.status(statusCode).json({
    ok: false,
    message,
  })
}

export default errorHandler
