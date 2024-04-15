const { Order, ProductOrder, Table, Product, Payment } = require("../database");
const ProductService = require("../services/product.service");
const TableService = require("../services/table.service");
const PaymentService = require("../services/payment.service");
const ApiError = require("../exceptions/error");
const { TableBookedError } = require("../constants/errors");
const { countProducts } = require("../utils/countProducts");
const bot = require("../bot");
const { parseOrderStatus } = require("../utils/parse");
const { Markup } = require("telegraf");

class OrderService {
  async findOrders() {
    return Order.findAll({
      include: [
        {
          model: Product,
          through: ProductOrder,
        },
        {
          model: Table,
        },
      ],
    });
  }

  async findOrderById(id) {
    return Order.findByPk(id);
  }

  async findOrThrowOrderById(id) {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          through: ProductOrder,
        },
        {
          model: Table,
        },
      ],
    });
    if (!order) {
      throw ApiError.NotFountError(); // change
    }

    return order;
  }

  async create(body) {
    const { tableId, products, price, type } = body;

    const table = await TableService.findOrThrowTableById(tableId);

    for (const product of products) {
      await ProductService.findOrThrowProductById(product.id);
    }

    let order;

    switch (type) {
      case "Наличные":
        order = await Order.create({
          tableId: table.id,
          price,
          status: "PAYMENT",
        });
        await bot.telegram.sendMessage(
          process.env.CHAT_ID,
          `<b>${process.env.RESTAURANT_NAME} | ОФИЦИАНТЫ</b>\n\nНовый заказ <b>№${order.id}</b>\n\nОплата наличными - стол <b>№${table.number}</b>\n\n<b>${products
            .map((product) => `${product.count} ${product.name}`)
            .join(", ")}</b>`,
          {
            parse_mode: "HTML",
            reply_markup: Markup.inlineKeyboard([
              [
                Markup.button.callback(
                  "Подтвердить оплату",
                  `change_status_${order.id}`,
                ),
              ],
            ]).reply_markup,
          },
        );

        break;
      case "RuKassa":
        order = await Order.create({ tableId: table.id, price });
        const url = await PaymentService.rukassaCreateOrder(price);
        order.url = url;
        await bot.telegram.sendMessage(
          process.env.CHAT_ID,
          `<b>${process.env.RESTAURANT_NAME} | ПОВАРА</b>\n\nНовый заказ <b>№${order.id}</b>\n\nCтол <b>№${table.number}</b>\n\n<b>${products
            .map((product) => `${product.count} ${product.name}`)
            .join(", ")}</b>`,
          {
            parse_mode: "HTML",
          },
        );
        break;
    }

    return order;
  }

  async changeStatus(id, status) {
    const order = await this.findOrThrowOrderById(id);

    if (status === "COMPLETE") {
      await TableService.changeBookedTable(order.table.id, false);
    }

    await bot.telegram.sendMessage(
      process.env.CHAT_ID,
      `${process.env.RESTAURANT_NAME} | ОФИЦИАНТЫ \n\nЗаказ <b>№${order.id}</b>\n\nCтол <b>№${order.table.number}</b>\n\nСтатус: <b>${parseOrderStatus(
        status,
      )}</b>`,
      {
        parse_mode: "HTML",
      },
    );

    return order.update({ status });
  }

  async checkOrder(id) {
    return PaymentService.rukassaCheckOrder(id);
  }
}

module.exports = new OrderService();
