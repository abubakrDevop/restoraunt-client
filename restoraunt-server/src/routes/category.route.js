const { Router } = require("express");
const router = Router();
const CategoryController = require("../controllers/category.controller");
const { param, body } = require("express-validator");
const checkErrorMiddleware = require("../middlewares/checkError");
const checkRoleMiddleware = require("../middlewares/checkRole");

router.get("/findAll", CategoryController.findAll);
router.get(
  "/findOne/:id",
  param("id").isInt(),
  checkErrorMiddleware,
  CategoryController.findOne,
);
router.post(
  "/create",
  checkRoleMiddleware(["ADMIN"]),
  body("title").notEmpty(),
  checkErrorMiddleware,
  CategoryController.create,
);
router.delete(
  "/delete/:id",
  checkRoleMiddleware(["ADMIN"]),
  param("id").isInt(),
  checkErrorMiddleware,
  CategoryController.delete,
);
router.patch(
  "/update/:id",
  checkRoleMiddleware(["ADMIN"]),
  param("id").isInt(),
  checkErrorMiddleware,
  CategoryController.update,
);

module.exports = router;
