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

// Gets a user from the database based on the id
app.get("/user/:id", async (req, res, next) => {
  const user = await User.findOne({ id: req.params.id }).exec();
  if (user == null) {
    res.json({
      id: -1
    });
  } else {
    res.json(user);
  }
});

// Adds a user to the database with a given id
app.post("/newUser/:id", (req, res, next) => {
  const newUser = new User({
    id: req.params.id,
    pogPrizes: [],
    prizes: []
  });
  newUser.save(err => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    }
  });
});

// Adds a PogPrize to the database with a given id
app.post("/newPogPrize", (req, res, next) => {
  const {
    title,
    description,
    pointsPerEntry,
    start,
    end,
    prizes,
    numberOfEntries
  } = req.body;

  let prizeList = [];

  prizes.forEach(prize => {
    prizeList.append(
      new Prize({
        title: prize,
        status: "Unfulfilled",
        user: null
      })
    );
  });

  const newPogPrize = new PogPrize({
    title: title,
    description,
    description,
    pointsPerEntry,
    pointsPerEntry,
    start: start,
    end: end,
    prizes: prizeList,
    numberOfEntries: numberOfEntires
  });
});

app.get("/", (req, res, next) => {
  res.json({ pog: "points" });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
