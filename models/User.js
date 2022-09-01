//I am removing "user.tweets" since it is unnecessary and brings me trouble ty

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  age: {
    type: Number,
    required: [true, "A user must have an age"],
  },

  tweetCount: {
    type: Number,
    default: 0,
  },

  _img: {
    type: String,
    default:
      "https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg",
  },

  followers: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      //autopopulate: true,
    },
  ],
  following: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      //autopopulate: true,
    },
  ],
});

userSchema.plugin(require('mongoose-autopopulate'))
const User = mongoose.model("User", userSchema);

module.exports = User;
