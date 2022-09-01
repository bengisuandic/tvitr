const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2")

const tweetSchema = new mongoose.Schema(
  {
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
    likes: [{ 
      type: mongoose.SchemaTypes.ObjectId, 
      ref: "User",
      autopopulate: true
    }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

tweetSchema.plugin(require('mongoose-autopopulate'))
tweetSchema.plugin(paginate)

const TweetModel = mongoose.model("Tweet", tweetSchema);

module.exports = TweetModel;
