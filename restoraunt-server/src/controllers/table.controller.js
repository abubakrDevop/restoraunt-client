const TableService = require("../services/table.service");
const { Success } = require("../constants/httpStatus");

const bot = require("../bot");

class TableController {
  async findAll(req, res, next) {
    try {
      const tables = await TableService.findAllTables();
      return res.json(tables);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const table = await TableService.findOrThrowTableById(id);

      return res.json(table);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async findOneStats(req, res, next) {
    try {
      const { id } = req.params;
      const table = await TableService.findTableAndStats(id);

      return res.json(table);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { number } = req.body;
      const table = await TableService.create(number);
      return res.json(table);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await TableService.delete(id);

      return res.json({ message: Success });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const table = await TableService.update(id, req.body);

      return res.json(table);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }

  async callWaiter(req, res, next) {
    try {
      const { id } = req.params;
      await TableService.callWaiter(id);

      return res.json({ message: Success });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async checkCode(req, res, next) {
    try {
      const { id } = req.params;
      const { code } = req.body;
      await TableService.checkCode(id, code);

      return res.json({ message: Success });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async bookTable(req, res, next) {
    try {
      const { name, number, mail } = req.body;
      await bot.telegram.sendMessage(
        process.env.CHAT_ID,
        `Заявка на бронь столика\n\nИмя: <b>${name}</b>\nНомер: <b>${number}</b>\nПочта: <b>${mail}</b>`,
        {
          parse_mode: "HTML",
        },
      );

      return res.json({ message: Success });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new TableController();
