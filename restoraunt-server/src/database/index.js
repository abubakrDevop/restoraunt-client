const path = require("path");
const { Sequelize } = require("sequelize");
const userModel = require("../models/user");
const categoryModel = require("../models/category");
const productModel = require("../models/product");
const orderModel = require("../models/order");
const tableModel = require("../models/table");
const tokenModel = require("../models/token");
const paymentModel = require("../models/payment");
const productOrderModel = require("../models/product-order");
const paymentOrderModel = require("../models/payment-order");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `${path.join(__dirname, "database.sqlite")}`,
  // timezone: "+03:00",
  logging: false,
});

const config = [sequelize];

const User = userModel(...config);
const Category = categoryModel(...config);
const Product = productModel(...config);
const Order = orderModel(...config);
const Table = tableModel(...config);
const Token = tokenModel(...config);
const Payment = paymentModel(...config);
const ProductOrder = productOrderModel(...config);
const PaymentOrder = paymentOrderModel(...config);

User.hasOne(Token);
Token.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Table.hasMany(Order);
Order.belongsTo(Table);

Product.belongsToMany(Order, { through: ProductOrder });
Order.belongsToMany(Product, { through: ProductOrder });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
  Table,
  Token,
  Payment,
  ProductOrder,
  PaymentOrder,
};
