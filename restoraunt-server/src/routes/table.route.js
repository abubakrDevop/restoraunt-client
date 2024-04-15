const { Router } = require("express");
const router = Router();
const TableController = require("../controllers/table.controller");
const checkRoleMiddleware = require("../middlewares/checkRole");
const { body, param } = require("express-validator");
const checkErrorMiddleware = require("../middlewares/checkError");

router.get("/findAll", checkRoleMiddleware(["ADMIN"]), TableController.findAll);

router.get(
  "/findOne/:id",
  param("id"),
  checkErrorMiddleware,
  TableController.findOne,
);

router.get(
  "/findOneStats/:id",
  param("id"),
  checkErrorMiddleware,
  TableController.findOneStats,
);

router.get(
  "/callWaiter/:id",
  param("id"),
  checkErrorMiddleware,
  TableController.callWaiter,
);

router.post(
  "/bookTable",
  body(["name", "number", "mail"]).notEmpty(),
  checkErrorMiddleware,
  TableController.bookTable,
);

router.post(
  "/checkCode/:id",
  param("id"),
  body("code").notEmpty(),
  checkErrorMiddleware,
  TableController.checkCode,
);

router.post(
  "/create",
  checkRoleMiddleware(["ADMIN"]),
  body("number").notEmpty().isInt(),
  checkErrorMiddleware,
  TableController.create,
);

router.delete(
  "/delete/:id",
  checkRoleMiddleware(["ADMIN"]),
  param("id"),
  checkErrorMiddleware,
  TableController.delete,
);

router.patch(
  "/update/:id",
  checkRoleMiddleware(["ADMIN"]),
  param("id"),
  checkErrorMiddleware,
  TableController.update,
);

module.exports = router;
