require("dotenv").config();
const { sequelize, User, Payment} = require("./index");
const bcrypt = require("bcrypt");

const payments = ["Наличные", "RuKassa"];

(async () => {
  await sequelize.sync({ force: true });
  const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 4);
  await User.create({
    name: process.env.ADMIN_LOGIN,
    password: hashPassword,
    role: "ADMIN",
  });

  for (const payment of payments) {
    await Payment.create({name: payment})
  }

  console.log("DB created");
})();
