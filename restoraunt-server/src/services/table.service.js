const {
  Table,
  Category,
  Product,
  ProductOrder,
  Order,
  sequelize,
} = require("../database");
const ApiError = require("../exceptions/error");
const {
  TableNotFoundError,
  TableAlreadyError,
  CodeNotFoundError,
} = require("../constants/errors");
const { Op } = require("sequelize");
const bot = require("../bot");

class TableService {
  async findAllTables() {
    return Table.findAll();
  }

  async findOrThrowTableById(id) {
    const table = await Table.findByPk(id);

    if (!table) {
      throw ApiError.CustomError(404, TableNotFoundError);
    }
    return table;
  }

  async findTableAndStats(id) {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const table = await Table.findByPk(id);

    const ordersInDay = await Order.findAll({
      where: {
        tableId: table.id,
        date: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay,
        },
        status: "COMPLETE",
      },
      include: [
        {
          model: Product,
          through: ProductOrder,
        },
      ],
    });

    if (!table) {
      throw ApiError.CustomError(404, TableNotFoundError);
    }

    const countProduct = ordersInDay.reduce(
      (accOrder, order) =>
        accOrder +
        order.products.reduce(
          (accProduct, product) => accProduct + product.product_order.count,
          0,
        ),
      0,
    );

    const countPrice = await Order.sum("price", {
      where: {
        status: "COMPLETE"
      }
    });

    return { table, countProduct, countPrice };
  }

  async findTableByNumber(number) {
    return Table.findOne({ where: { number } });
  }

  // async findOrThrowTableByNumber(number) {
  //   console.log(number);
  //   const table = await Table.findOne({ where: { number } });
  //   if (!table) {
  //     throw ApiError.CustomError(404, "Столик не найден");
  //   }
  //   return table;
  // }

  async create(number) {
    const table = await this.findTableByNumber(number);
    if (table) {
      throw ApiError.CustomError(409, TableAlreadyError);
    }
    return Table.create({ number });
  }

  async delete(id) {
    const table = await this.findOrThrowTableById(id);
    await table.destroy();
    return true;
  }

  async update(id, body) {
    const { number } = body;
    const table = await this.findOrThrowTableById(id);
    const tableData = await Table.findOne({
      where: {
        id: {
          [Op.not]: table.id,
        },
        number,
      },
    });
    if (tableData) {
      throw ApiError.CustomError(409, TableAlreadyError);
    }
    return table.update(body);
  }

  async changeBookedTable(id, isBooked) {
    const table = await this.findOrThrowTableById(id);
    await table.update({ isBooked });
  }

  async checkCode(id, code) {
    const table = await Table.findOne({
      where: {
        id,
        code,
      },
    });
    if (!table) {
      throw ApiError.BadRequest(CodeNotFoundError);
    }
  }

  async callWaiter(id) {
    const table = await this.findOrThrowTableById(id);
    await bot.telegram.sendMessage(
      process.env.CHAT_ID,
      `Вызов официанта\n\nК <b>столу №${table.number}</b> позвали официанта`,
      {
        parse_mode: "HTML",
      },
    );

    return true;
  }
}

module.exports = new TableService();
