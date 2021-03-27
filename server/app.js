const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const axios = require("axios");

logger.info("connecting to", process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/", (req, res, next) => {
  res.json({ Hello: "World!" });
});

app.get("/refresh", (req, res, next) => {
  const { refreshToken } = req.body;
  const refreshOptions = {
    method: "POST",
    url: `https://id.twitch.tv/oauth2/token`,
    headers: { "content-type": "application/json" },
    data: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }
  };

  try {
    const response = await axios(refreshOptions);

    res.json(response.data);
  } catch (error) {
    
  }
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
