export const notFound = (req, res, next) => {
  res.status(404);
  throw new Error(`Not found ${req.originalUrl}`);
  next();
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};
