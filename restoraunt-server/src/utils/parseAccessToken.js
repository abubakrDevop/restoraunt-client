const ApiError = require("../exceptions/error");
const TokenService = require('../services/token.service');

function parseAccessToken(req, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return next(ApiError.UnauthorizedError());
  }

  const accessToken = authorizationHeader.split(" ")[1];
  if (!accessToken) {
    return next(ApiError.UnauthorizedError());
  }

  const userData = TokenService.validateAccessToken(accessToken);
  if (!userData) {
    return next(ApiError.UnauthorizedError());
  }

  return userData;
}

module.exports = {
  parseAccessToken,
};
