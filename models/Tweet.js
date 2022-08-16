const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  data: {
    type: String,
    // required: [true, 'A tweet must have content']
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    // autopopulate: true
    // strictPopulate:false
  },
  likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Like" }],
});

//tweetSchema.plugin(require('mongoose-autopopulate'))

const TweetModel = mongoose.model("Tweet", tweetSchema);

module.exports = TweetModel;
