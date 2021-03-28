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
      twitchid: -1,
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
    prizes: [],
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    }
  });
});
//creates custom twitch reward
const addCustomReward = async (id, rewardBody, rewardHeaders) => {
  try {
    let { body } = await axios.post(
      `https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${id}`,
      {headers:rewardHeaders,
        body: JSON.stringify(rewardBody),
        responseType: "json",
      }
    );

    return body.data[0].id;
  } catch (error) {
    console.log("Failed to add the reward. Please try again.");
    return false;
  }
};

// Adds a PogPrize to the database with a given id
app.post("/newPogPrize", async (req, res, next) => {
  const {
    title,
    description,
    pointsPerEntry,
    endsAt,
    prizeDescription,
    numberOfPrizes,
    broadcaster,
    accesstoken
  } = req.body;

  const broadcasterObject = await User.findOne({ twitchid: broadcaster });
  
  const rewardHeaders = {
    "Authorization": `Bearer ${accessToken}`,
    "Client-ID": process.env.CLIENT_ID,
    "Content-Type": "application/json"
  }
  
  const rewardBody = {
    title: `${title} - One Ticket`,
    prompt: description,
    cost: pointsPerEntry,
    is_enabled: true,
    is_global_cooldown_enabled: true,
    global_cooldown_seconds: Math.floor(
      (new Date(endsAt).getTime() - new Date().getTime()) / 1000
    ),
  };

  const rewardId = await addCustomReward(broadcaster, rewardBody, rewardHeaders)

  const newPogPrize = new PogPrize({
    title: title,
    description: description,
    pointsPerEntry: pointsPerEntry,
    start: Date.now(),
    endsAt: Date.parse(endsAt),
    prizeDescription: prizeDescription,
    numberOfPrizes: numberOfPrizes,
    entries: [],
    broadcaster: broadcasterObject,
    reward: rewardId
  });

  await newPogPrize.save();

  // broadcasterObject.pogPrizes.push(newPogPrize);
  // await broadcasterObject.save();

  // create new custom reward with twitch
  

  res.status(201).json(newPogPrize);
});

app.get("/activepogprize/:id", async (req, res, next) => {
  const twitchid = req.params.id;
  const broadcaster = await User.findOne({ twitchid: twitchid });
  const pogprizes = await PogPrize.findOne({
    broadcaster: broadcaster,
    endsAt: { $gt: Date.now() },
  }).exec();
  res.json(pogprizes);
});

app.get("/pogprizes/:id", async (req, res, next) => {
  const twitchid = req.params.id;
  const broadcaster = await User.findOne({ twitchid: twitchid });
  const pogprizes = await PogPrize.find({ broadcaster: broadcaster }).exec();
  res.json(pogprizes);
});

app.get("/", (req, res, next) => {
  res.json({ pog: "points" });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
