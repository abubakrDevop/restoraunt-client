const { Composer } = require("telegraf");
const { Order, ProductOrder, Product, Table } = require("../database");

const composer = new Composer();

composer.action(/^change_status_(\d+)$/, async (ctx) => {
  try {
    await ctx.deleteMessage().catch((e) => e);

    const id = ctx.match[1];
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

    await order.update({ status: "CREATED" });

    await ctx.telegram.sendMessage(
      process.env.CHAT_ID,
      `<b>${process.env.RESTAURANT_NAME} | ПОВАРА</b>\n\nНовый заказ <b>№${order.id}</b>\n\nCтол <b>№${order.table.number}</b>\n\n<b>${order.products
        .map((product) => `${product.product_order.count} ${product.name}`)
        .join(", ")}</b>`,
      {
        parse_mode: "HTML",
      },
    );
  } catch (e) {
    console.log(e);
  }
});

module.exports = composer;
