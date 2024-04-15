const PaymentService = require("../services/payment.service");
const OrderService = require("../services/order.service");

class PaymentController {
  async findAll(req, res, next) {
    try {
      const payments = await PaymentService.findAll();

      return res.json(payments);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const payment = await PaymentService.update(id, req.body);
      return res.json(payment);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async checkOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = OrderService.checkOrder(id);

      return res.json(order);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new PaymentController();
