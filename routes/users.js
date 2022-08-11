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


router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const myUser = await UserService.find(userId);
    res.send(myUser);
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
});

router.get("/del/:tweetId", async (req, res) => {
  try {
    const { tweetId } = req.params;
    const tweets = await UserService.deleteTweet(tweetId);
    TweetService.del(tweetId);
    res.status(200).send(tweets);
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
