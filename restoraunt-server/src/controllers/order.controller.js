const OrderService = require("../services/order.service");

class OrderController {
  async findAll(req, res, next) {
    try {
      const orders = await OrderService.findOrders();
      return res.json(orders);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.findOrThrowOrderById(id);
      return res.json(order);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const order = await OrderService.create(req.body);
      return res.json(order);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async changeStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await OrderService.changeStatus(id, status);
      return res.json(order);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new OrderController();
