require("dotenv").config();
const { Telegraf } = require("telegraf");
const orderHandler = require("./handlers/order");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(orderHandler);

module.exports = bot;
