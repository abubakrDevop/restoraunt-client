const { Router } = require("express");
const router = Router();
const OrderController = require("../controllers/order.controller");
const { param, body } = require("express-validator");
const checkErrorMiddleware = require("../middlewares/checkError");
const checkRoleMiddleware = require("../middlewares/checkRole");

router.get(
  "/findAll",
  checkRoleMiddleware(["ADMIN", "COOK"]),
  OrderController.findAll,
);
router.get(
  "/findOne/:id",
  checkRoleMiddleware(["ADMIN", "COOK"]),
  param("id").isInt(),
  checkErrorMiddleware,
  OrderController.findOne,
);
router.post(
  "/create",
  body(["products", "tableId"]).notEmpty(),
  checkErrorMiddleware,
  OrderController.create,
);
router.patch(
  "/changeStatus/:id",
  checkRoleMiddleware(["ADMIN", "COOK"]),
  param("id").isInt(),
  body(["orderId"]).notEmpty().isInt(),
  OrderController.changeStatus,
);

module.exports = router;
