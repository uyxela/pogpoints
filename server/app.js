const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const axios = require("axios");
const { User, PogPrize, Prize } = require("./database");

logger.info("connecting to", process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/", (req, res, next) => {
  res.json({ pog: "points" });
});

app.get("/user/:id", async (req, res, next) => {
  return await User.findOne({ id: req.params.id }).exec();
});

app.post("/newUser/:id", (req, res, next) => {
  const newUser = new User({
    id: req.params.id,
    pogPrizes: [],
    prizes: []
  });
  newUser.save(err => {
    console.log(err);
  });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
