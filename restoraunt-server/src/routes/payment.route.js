const { Router } = require("express");
const checkRoleMiddleware = require("../middlewares/checkRole");
const PaymentController = require("../controllers/payment.controller");
const { param } = require("express-validator");
const checkErrorMiddleware = require("../middlewares/checkError");
const router = Router();

router.get("/findAll", PaymentController.findAll);
router.patch(
  "/update/:id",
  checkRoleMiddleware(["ADMIN"]),
  param("id").isInt(),
  checkErrorMiddleware,
  PaymentController.update,
);
router.post(
  "/checkOrder",
  param("id").isInt(),
  checkErrorMiddleware,
  PaymentController.checkOrder,
);

module.exports = router;
