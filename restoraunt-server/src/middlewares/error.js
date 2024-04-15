const ApiError = require("../exceptions/error");
const { InternalServerException } = require("../constants/httpStatus");

module.exports = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      message: error.message,
      status: error.status,
      errors: error.errors,
    });
  }
  return res
    .status(500)
    .json({ message: InternalServerException, status: 500 });
};
