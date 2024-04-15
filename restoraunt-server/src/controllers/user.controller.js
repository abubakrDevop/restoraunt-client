const UserService = require("../services/user.service");
const ApiError = require("../exceptions/error");
const { Success } = require("../constants/httpStatus");

class UserController {
  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.findOrThrowUserById(id);

      return res.json(user);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async findAll(req, res, next) {
    try {
      const users = await UserService.findAllUsers();

      return res.json(users);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { name, password, role } = req.body;

      const user = await UserService.create(name, password, role);
      return res.json(user);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await UserService.delete(id);

      return res.json({ message: Success });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      await UserService.update(id, req.body);

      return res.json({ message: Success });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { name, password } = req.body;

      const userData = await UserService.login(name, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }
}

module.exports = new UserController();
