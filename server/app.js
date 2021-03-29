const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const axios = require("axios");
const { User, PogPrize, Prize } = require("./database");
const https = require("https");

logger.info("connecting to", process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.post("/createWebhook/:broadcasterId", (req, res) => {
  let oauth;

  axios
    .post(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials&scope=channel:read:redemptions%20channel:manage:redemptions`
    )
    .then(oauthRes => {
      // console.log(res);
      oauth = oauthRes.data.access_token;
      var createWebHookParams = {
        host: "api.twitch.tv",
        path: "helix/eventsub/subscriptions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Client-ID": process.env.CLIENT_ID,
          Authorization: "Bearer " + oauth
        }
      };
      var createWebHookBody = {
        type: "channel.channel_points_custom_reward_redemption.add",
        version: "1",
        condition: {
          broadcaster_user_id: req.params.broadcasterId
        },
        transport: {
          method: "webhook",
          // For testing purposes you can use an ngrok https tunnel as your callback URL
          callback: "https://pogpoints.herokuapp.com" + "/notification", // If you change the /notification path make sure to also adjust in line 69
          secret: process.env.CLIENT_SECRET // Replace with your own secret
        }
      };
      var responseData = "";
      var webhookReq = https.request(createWebHookParams, result => {
        result.setEncoding("utf8");
        result
          .on("data", function (d) {
            responseData = responseData + d;
          })
          .on("end", function (result) {
            var responseBody = JSON.parse(responseData);
            res.send(responseBody);
          });
      });
      webhookReq.on("error", e => {
        console.log("Error");
      });
      webhookReq.write(JSON.stringify(createWebHookBody));
      webhookReq.end();
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/notification", async (req, res) => {
  if (
    req.header("Twitch-Eventsub-Message-Type") ===
    "webhook_callback_verification"
  ) {
    console.log(req.body.challenge);
    res.send(req.body.challenge); // Returning a 200 status with the received challenge to complete webhook creation flow
  } else if (req.header("Twitch-Eventsub-Message-Type") === "notification") {
    console.log(req.body.event); // Implement your own use case with the event data at this block
    const eventInfo = req.body.event;

    const entry = {
      time: Date.parse(eventInfo.redeemed_at),
      viewer: eventInfo.user_id,
      name: eventInfo.user_name
    };

    const broadcaster = await User.findOne({
      twitchid: eventInfo.broadcaster_user_id
    });

    const pogprize = await PogPrize.findOne({
      broadcaster: broadcaster,
      active: true
    });

    pogprize.entries.push(entry);

    await pogprize.save();

    res.send(""); // Default .send is a 200 status
  }
});
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

//creates custom twitch reward
const addCustomReward = async (id, rewardBody, rewardHeaders) => {
  try {
    let res = await axios.post(
      `https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${id}`,
      JSON.stringify(rewardBody),
      {
        headers: rewardHeaders
      }
    );
    // console.log("HELLO OVER HERE", res);
    return res.data.data[0].id;
  } catch (error) {
    console.log(error);
  }
};

//creates custom twitch reward
const deleteCustomReward = async (id, rewardid, rewardHeaders) => {
  try {
    let res = await axios.delete(
      `https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${id}&id=${rewardid}`,
      {
        headers: rewardHeaders
      }
    );
    // console.log("HELLO OVER HERE", res);
  } catch (error) {
    console.log(error);
  }
};

// Adds a PogPrize to the database with a given id
app.post("/newPogPrize", async (req, res, next) => {
  const {
    title,
    description,
    pointsPerEntry,
    start,
    endsAt,
    prizeDescription,
    numberOfPrizes,
    broadcaster,
    accessToken,
    active
  } = req.body;

  const broadcasterObject = await User.findOne({ twitchid: broadcaster });

  const rewardHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "client-id": process.env.CLIENT_ID,
    "Content-Type": "application/json"
  };

  const rewardBody = {
    title: `${title} - One Entry`,
    prompt: prizeDescription,
    cost: pointsPerEntry,
    is_enabled: active,
    should_redemptions_skip_request_queue: true
  };

  const rewardId = await addCustomReward(
    broadcaster,
    rewardBody,
    rewardHeaders
  );

  const newPogPrize = new PogPrize({
    title: title,
    description: description,
    pointsPerEntry: pointsPerEntry,
    start: Date.parse(start),
    endsAt: Date.parse(endsAt),
    prizeDescription: prizeDescription,
    numberOfPrizes: numberOfPrizes,
    entries: [],
    broadcaster: broadcasterObject,
    rewardId: rewardId,
    active: active
  });

  await newPogPrize.save();

  // broadcasterObject.pogPrizes.push(newPogPrize);
  // await broadcasterObject.save();

  res.status(201).json(newPogPrize);
});

app.get("/activepogprize/:id", async (req, res, next) => {
  const twitchid = req.params.id;
  const broadcaster = await User.findOne({ twitchid: twitchid });
  const pogprizes = await PogPrize.find({
    broadcaster: broadcaster,
    active: true
  }).exec();
  res.json(pogprizes);
});

app.get("/pogprizes/:id", async (req, res, next) => {
  const twitchid = req.params.id;
  const broadcaster = await User.findOne({ twitchid: twitchid });
  const pogprizes = await PogPrize.find({ broadcaster: broadcaster }).exec();
  res.json(pogprizes);
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

app.post("/drawpogprize/:id", async (req, res, next) => {
  const twitchid = req.params.id;
  const { accessToken } = req.body;
  const broadcaster = await User.findOne({ twitchid: twitchid });
  const pogprizes = await PogPrize.find({
    broadcaster: broadcaster,
    active: true
  }).exec();
  let i = (pogprizes.entries[0].length>=pogprizes.numberOfPrizes) ? pogprizes.numberOfPrizes:pogprizes.entries[0].length;
  await PogPrize.updateOne(
    {
      broadcaster: broadcaster,
      active: true
    },
    {
      active: false
    }
  );

  console.log("pogprizes", pogprizes, "i value", i, pogprizes.entries[0].length);
  console.log(typeof pogprizes.entries,typeof pogprizes.entries[0])

  // delete custom reward
  const rewardHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "client-id": process.env.CLIENT_ID,
    "Content-Type": "application/json"
  };

  await deleteCustomReward(twitchid, pogprizes[0].rewardId, rewardHeaders);

  let winners = [];
  
  // randomly select an entry and add the viewer to the winner list if the viewer is not already in the list
  while (i > 0) {
    let entry = pogprizes.entries[0][getRandomInt(0, pogprizes.entries[0].length)];
    if (!winners.includes(entry.name)) {
      winners.push(entry.name);
      i--;
    }
  }

  console.log("winners", winners);

  // create a prize object for each winner and save it to the database
  winners.forEach(winner => {
    const prize = new Prize({
      title: pogprizes.prizeDescription,
      status: "Unfulfilled",
      broadcaster: broadcaster,
      name: winner
    });
    console.log("PRIZE PRIZE PRIZE", prize);
    prize.save();
  });

  res.sendStatus(200);
});

app.get("/prizelist", async (req, res, next) => {
  const prizes = await Prize.find({}).exec();
  res.json(prizes);
});

app.put("/fulfillprize", async (req, res, next) => {
  const { title, name } = req.body;

  await Prize.updateOne(
    {
      title: title,
      name: name
    },
    { status: "Fulfilled" }
  );

  res.sendStatus(301);
});

app.get("/", (req, res, next) => {
  res.json({ pog: "points" });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
