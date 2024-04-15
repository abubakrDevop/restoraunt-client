const { Payment, PaymentOrder } = require("../database");
const ApiError = require("../exceptions/error");
const axios = require("axios");
const uuid = require("uuid");

class PaymentService {
  async findOrThrowPaymentById(id) {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      throw ApiError.NotFountError();
    }
    return payment;
  }

  async findAll() {
    return Payment.findAll();
  }

  async update(id, body) {
    const payment = await this.findOrThrowPaymentById(id);

    return await payment.update(body);
  }

  async rukassaCreateOrder(price, tableId) {
    const orderId = uuid.v4();

    const { data } = await axios.post(process.env.RUKASSA_URL + "/create", {
      shop_id: process.env.RUKASSA_SHOP_ID,
      order_id: orderId,
      amount: price,
      data: JSON.stringify({ tableId }),
      token: process.env.RUKASSA_API_TOKEN,
    });

    await PaymentOrder.create({
      id: orderId,
      orderId: data.id,
    });

    return data.url;
  }

  async rukassaCheckOrder(orderId) {
    const { data } = await axios.post(process.env.RUKASSA_URL + "/getPayInfo", {
      id: orderId,
      shop_id: process.env.RUKASSA_SHOP_ID,
      token: process.env.RUKASSA_API_TOKEN,
    });

    return data;
  }
}

module.exports = new PaymentService();
