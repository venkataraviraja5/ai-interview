export function errorHandler(err) {

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Something went wrong';

  return new Response(
    JSON.stringify({
      status: err.status || "error",
      message,
    }),
    { status: statusCode }
  );
}
