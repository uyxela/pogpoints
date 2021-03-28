const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(mongodb, { useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("connected to database");
});

const prizeSchema = new Schema({
  title: String,
  status: String,
  user: String
});

const pogPrizeSchema = new Schema({
  title: String,
  description: String,
  pointsPerEntry: Number,
  start: { type: Date, default: Date.now },
  end: { type: Date },
  prizes: [prizeSchema],
  numberOfEntries: Number
});

const userSchema = new Schema({
  id: String,
  pogPrizes: [pogPrizeSchema],
  prizes: [prizeSchema]
});

export const Prize = mongoose.model("Prize", prizeSchema);
export const PogPrize = mongoose.model("PogPrize", pogPrizeSchema);
export const User = mongoose.model("User", userSchema);