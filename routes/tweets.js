const express = require("express");
const router = express.Router();
const TweetService = require("../services/TweetService");
const UserService = require("../services/UserService");
const auth = require("../middlewares/auth");

//Get all tweets (prob should be an admin thing)
router.get("/all", auth, async (req, res) => {
  const allTweets = await TweetService.writeAllTweets();
  res.send(allTweets);
});

//Get single tweet with id
router.get("/:tweetId", async (req, res) => {
  try {
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

//Post a tweet with token
router.post("/tweetAt", auth, async (req, res) => {
  try {
    const { data } = req.body;
    const newTweet = await UserService.tweetAt(data, req.user._id);
    res.status(200).send(newTweet);
  }catch (err) {
    res.status(404).json({
      status: "Fail", 
      message: err.message,
    });
  }
});

//Delete a tweet with token
router.get("/del/:tweetId", auth, async (req, res) => {
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

//Like a tweet with token (maybe a user shouldnt be able to like their own tweet?)
router.post("/likeTweet/:tweetId", auth, async (req, res) => {
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
