const ApiError = require("../exceptions/error");
const { parseAccessToken } = require("../utils/parseAccessToken");

module.exports = (req, res, next) => {
  try {
    req.user = parseAccessToken(req, next);
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
