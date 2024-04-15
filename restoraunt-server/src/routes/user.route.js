const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/user.controller");
const { body, param } = require("express-validator");

const checkErrorMiddleware = require("../middlewares/checkError");
// const checkAuthMiddleware = require("../middlewares/checkAuth");
const checkRoleMiddleware = require("../middlewares/checkRole");

router.get("/findAll", checkRoleMiddleware(["ADMIN"]), UserController.findAll);
router.get(
  "/findOne/:id",
  checkRoleMiddleware(["ADMIN"]),
  param("id").isInt(),
  checkErrorMiddleware,
  UserController.findOne,
);
router.post(
  "/create",
  checkRoleMiddleware(["ADMIN"]),
  body(["name", "password", "role"]).notEmpty(),
  checkErrorMiddleware,
  UserController.create,
);
router.delete(
  "/delete/:id",
  checkRoleMiddleware(["ADMIN"]),
  param(["id"]).isInt(),
  checkErrorMiddleware,
  UserController.delete,
);
router.patch(
  "/update/:id",
  checkRoleMiddleware(["ADMIN"]),
  param(["id"]).isInt(),
  checkErrorMiddleware,
  UserController.update,
);
router.post(
  "/login",
  body(["name", "password"]).notEmpty(),
  checkErrorMiddleware,
  UserController.login,
);
router.get("/refresh", UserController.refresh);

module.exports = router;
