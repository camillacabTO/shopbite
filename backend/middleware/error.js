const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const errorCode = res.statusCode === 200 ? 500 : res.statusCode;
  // even when there is an error the status code can get back as 200. Changing to 500 here
  // attaching back to the response
  res.status(errorCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
