const express = require("express");
const router = express.Router();
const TweetService = require("../services/TweetService");
const UserService = require("../services/UserService");
const auth = require("../middlewares/auth");


//Get all tweets (prob should be an admin thing)
router.get("/all", async (req, res) => {
  const allTweets = await TweetService.writeAllTweets();
  res.send(allTweets);
});

//Get single tweet with tweet id
router.get("/singleTweet/:tweetId", async (req, res) => {
  try {
    const { tweetId } = req.params;
    //console.log(tweetId);
    const myTweet = await TweetService.find(tweetId);
    res.send(myTweet);
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
});

//Get a user's tweets
router.get("/userTweets/:userId",  async (req, res) => {
  try {
    const tweets = await TweetService.query({user: req.params.userId});
    res.send(tweets);
  } catch (error) {
    res.status(400).send("Find profile tweets failed")
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
      status: "Failed to send tweet", 
      message: err.message,
    });
  }
});

//Delete a tweet with token
router.get("/del/:tweetId", auth, async (req, res) => {
  try {
    const { tweetId } = req.params;
    console.log("TWEETID:", tweetId, "usr:", req.user._id)
    const resp = await UserService.deleteTweet(req.user._id, tweetId);
    const resp1 = await TweetService.del(tweetId);
    const tweets = await TweetService.query({user: req.user._id});
    console.log(tweets);
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
    const { tweetId } = req.params;
    const response = await UserService.likeTweet(tweetId, req.user._id);
    res.status(200).send(response);
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
});

module.exports = router;
