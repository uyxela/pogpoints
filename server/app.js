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
  const user = await User.findOne({ twitchid: req.params.id }).exec();
  if (user == null) {
    res.json({
      twitchid: -1
    });
  } else {
    res.json(user);
  }
});

// Adds a user to the database with a given id
app.post("/newUser/:id", (req, res, next) => {
  const newUser = new User({
    twitchid: req.params.id,
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
app.post("/newPogPrize", async (req, res, next) => {
  const {
    title,
    description,
    pointsPerEntry,
    end,
    prizeDescription,
    numberOfPrizes,
    broadcaster
  } = req.body;

  const broadcasterObject = await User.findOne({ twitchid: broadcaster });

  const newPogPrize = new PogPrize({
    title: title,
    description: description,
    pointsPerEntry: pointsPerEntry,
    start: Date.now(),
    end: end,
    prizeDescription: prizeDescription,
    numberOfPrizes: numberOfPrizes,
    entries: [],
    broadcaster: broadcasterObject
  });

  await newPogPrize.save();
  res.status(201).json(newPogPrize);
});

app.get("/", (req, res, next) => {
  res.json({ pog: "points" });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
