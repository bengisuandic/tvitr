const express = require("express");
const router = express.Router();
const TweetService = require("../services/TweetService");
const UserService = require("../services/UserService");

router.get("/all", async (req, res) => {
  const allTweets = await TweetService.findAll();
  res.send(allTweets);
});

router.get("/:tweetId", async (req, res) => {
  try {
    console.log("hello????");
    const { tweetId } = req.params;
    console.log(tweetId);
    const myTweet = await TweetService.find(tweetId);
    res.send(myTweet);
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
});

router.post("/tweetAt", async (req, res) => {
  const { data } = req.body;
  const newTweet = await UserService.tweetAt(data);
  res.status(200).send(newTweet);
});

module.exports = router;
