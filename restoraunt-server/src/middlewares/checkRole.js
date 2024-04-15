const ApiError = require("../exceptions/error");
const { parseAccessToken } = require("../utils/parseAccessToken");
const { DontHavePermissionException } = require("../constants/httpStatus");

module.exports = (roles) => {
  return (req, res, next) => {
    try {
      const userData = parseAccessToken(req, next);
      const hasRole = roles.includes(userData.role);
      if (!hasRole) {
        return next(ApiError.CustomError(409, DontHavePermissionException));
      }

      return next();
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  };
};
