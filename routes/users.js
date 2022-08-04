const express = require("express");
const TweetService = require("../services/TweetService");
const router = express.Router();
const UserService = require("../services/UserService");

router.get("/all", async (req, res) => {
  const people = await UserService.findAll();
  res.send(people);
});

router.post("/", async (req, res) => {
  const newUser = await UserService.add(req.body);
  res.status(200).send(newUser);
});

router.get("/del/:tweetId", async (req, res) => {
  const { tweetId } = req.params;
  UserService.deleteTweet(tweetId);
  try {
    const tweets = await TweetService.del(tweetId);
    res.send(tweets);
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
});

router.post("/likeTweet/:tweetId", async (req, res) => {
  try {
    console.log("hello res");
    const { tweetId } = req.params;
    // console.log(tweetId)
    const response = await UserService.likeTweet(tweetId);
    res.status(200).send(response);
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
});

module.exports = router;
