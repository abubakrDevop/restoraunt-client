const {
  InternalServerError,
  NotFoundException,
  ConflictException, UnauthorizedException,
} = require("../constants/httpStatus");

module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static InternalServerError() {
    return new ApiError(500, InternalServerError);
  }

  static NotFountError() {
    return new ApiError(404, NotFoundException);
  }

  static BadRequest(message, errors) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, UnauthorizedException);
  }

  static ConflictError() {
    return new ApiError(409, ConflictException);
  }

  static CustomError(status, message, errors) {
    return new ApiError(status, message, errors);
  }
};
