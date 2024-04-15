require("dotenv").config();

const port = process.env.PORT || "80";
const express = require("express");
const errorMiddleware = require("./middlewares/error");
const router = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const bot = require("./bot");

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use("/assets", express.static(path.resolve(__dirname, "assets")));
app.use(cookieParser());
app.use(fileUpload({}));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use("/api", router);
app.use(errorMiddleware);

function startServer() {
  try {
    app.listen(port);
    bot.launch();
    console.log(`Server has been started on port :${port}`);
  } catch (e) {
    console.log(e);
  }
}

startServer();
