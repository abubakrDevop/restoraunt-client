const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/error");
const { BadRequestException } = require("../constants/httpStatus");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(ApiError.BadRequest(BadRequestException, errors.array()));
  }

  return next();
};
