const { Router } = require("express");
const router = Router();

const userRoute = require("./user.route");
const tableRoute = require("./table.route");
const categoryRoute = require("./category.route");
const productRoute = require("./product.route");
const orderRoute = require("./order.route");
const paymentRoute = require("./payment.route");

router.use("/user", userRoute);
router.use("/table", tableRoute);
router.use("/category", categoryRoute);
router.use("/product", productRoute);
router.use("/order", orderRoute);
router.use("/payment", paymentRoute);

module.exports = router;
