const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("connected to database");
});

const prizeSchema = new Schema({
  title: String,
  status: String,
  broadcaster: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  pogprize: {
    type: Schema.Types.ObjectId,
    ref: "PogPrize"
  },
  name: String
});

const pogPrizeSchema = new Schema({
  title: String,
  description: String,
  pointsPerEntry: Number,
  start: { type: Date },
  endsAt: { type: Date },
  prizeDescription: String,
  numberOfPrizes: Number,
  entries: [
    {
      time: { type: Date },
      viewer: String,
      name: String
    }
  ],
  broadcaster: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  rewardId: String,
  active: Boolean
});

const userSchema = new Schema({
  twitchid: String
  // pogPrizes: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "PogPrize"
  //   }
  // ],
  // prizes: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Prizes"
  //   }
  // ]
});

const Prize = mongoose.model("Prize", prizeSchema);
const PogPrize = mongoose.model("PogPrize", pogPrizeSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Prize,
  PogPrize,
  User
};
