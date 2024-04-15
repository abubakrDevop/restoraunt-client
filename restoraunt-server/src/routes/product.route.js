const { Router } = require("express");
const router = Router();
const ProductController = require("../controllers/product.controller");
const { param, body } = require("express-validator");
const checkErrorMiddleware = require("../middlewares/checkError");
const checkRoleMiddleware = require("../middlewares/checkRole");

router.get("/findAll", ProductController.findAll);
router.get("/findAllActive", ProductController.findAllActive);
router.get(
  "/findOne/:id",
  param("id").isInt(),
  checkErrorMiddleware,
  ProductController.findOne,
);
router.post(
  "/create",
  checkRoleMiddleware(["ADMIN"]),
  body(["name", "description", "price", "categoryId"]).notEmpty(),
  checkErrorMiddleware,
  ProductController.create,
);
router.delete(
  "/delete/:id",
  checkRoleMiddleware(["ADMIN"]),
  param("id").isInt(),
  checkErrorMiddleware,
  ProductController.delete,
);
router.patch(
  "/update/:id",
  checkRoleMiddleware(["ADMIN", "COOK"]),
  param("id").isInt(),
  checkErrorMiddleware,
  ProductController.update,
);

module.exports = router;
