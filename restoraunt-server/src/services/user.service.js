const { User } = require("../database");
const ApiError = require("../exceptions/error");
const {
  BadLoginException,
  DontHavePermissionException,
} = require("../constants/httpStatus");
const bcrypt = require("bcrypt");

const TokenService = require("./token.service");
const { UserAlreadyError, UserNotFountError } = require("../constants/errors");
const { Op } = require("sequelize");

class UserService {
  async findUserById(id) {
    return User.findByPk(id);
  }

  async findOrThrowUserById(id) {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "role"],
    });
    if (!user) {
      throw ApiError.CustomError(404, UserNotFountError);
    }

    return user;
  }

  async findUserByName(name) {
    return User.findOne({
      where: { name },
    });
  }

  async findAllUsers() {
    return User.findAll({
      where: {
        role: {
          [Op.not]: "ADMIN",
        },
      },
    });
  }

  async create(name, password, role) {
    const candidate = await this.findUserByName(name);
    if (candidate) {
      throw ApiError.CustomError(409, UserAlreadyError);
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = await User.create({
      name,
      password: hashPassword,
      role,
    });

    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const tokens = TokenService.generateTokens(payload);
    await TokenService.saveToken(payload.id, tokens.refreshToken);

    return { ...tokens, user: payload };
  }

  async delete(id) {
    const user = await this.findOrThrowUserById(id);
    if (user.role === "ADMIN") {
      throw ApiError.BadRequest(DontHavePermissionException);
    }
    await user.destroy();
  }

  async update(id, body) {
    const user = await this.findOrThrowUserById(id);
    if (user.role === "ADMIN") {
      throw ApiError.BadRequest(DontHavePermissionException);
    }
    return user.update(body);
  }

  async login(name, password) {
    const user = await this.findUserByName(name);
    if (!user) {
      throw ApiError.BadRequest(BadLoginException);
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest(BadLoginException);
    }

    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const tokens = TokenService.generateTokens(payload);
    await TokenService.saveToken(payload.id, tokens.refreshToken);

    return { ...tokens, user: payload };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDatabase = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDatabase) {
      throw ApiError.UnauthorizedError();
    }

    const user = await this.findOrThrowUserById(userData.id);

    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const tokens = TokenService.generateTokens(payload);
    await TokenService.saveToken(payload.id, tokens.refreshToken);
    return { ...tokens, user: payload };
  }
}

module.exports = new UserService();
