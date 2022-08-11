const BaseService = require("./BaseService");
const UserModel = require("../models/User");
const TweetService = require("./TweetService");
const LikeService = require("./LikeService");
let id = "62eb67e72243ec803a341a67";

class UserService extends BaseService {
  model = UserModel;

  async tweetAt(data) {
    const tweet = await TweetService.add({ data: data, user: id });
    const userTweet = await this.find(id);
    userTweet.tweets.push(tweet);
    userTweet.tweetCount += 1;
    userTweet.save();
    return tweet;
  }

  async likeTweet(tweetId) {
    const newLike = await TweetService.find(tweetId);
    const myIndex = newLike.likes.findIndex((el) => el == id);
    if (myIndex !== -1) {
      newLike.likes.splice(myIndex, 1);
      console.log("unliked");
    } else {
      newLike.likes.push(id);
      console.log("liked");
    }
    newLike.save();
    return newLike;
  }

  async deleteTweet(tweetId) {
    const myUser = await this.find(id);
    //console.log("found user:", myUser);
    const delIndex = myUser.tweets.findIndex((el) => el._id == tweetId);
    //console.log("delIndex:", delIndex);
    if (delIndex !== -1) {
      myUser.tweets.splice(delIndex, 1);
      //console.log(`tweet deleted. New tweet list: ${myUser.tweets}`);
      myUser.tweetCount -= 1;
      //console.log("my user in delete", myUser)
      myUser.save();
      return myUser.tweets;
    } else {
      // console.log(
      //   "Tweet not found in user's list. How did u even send request???"
      // );
      return "Fail. Tweet not found in user's list";
    }
  }
}

module.exports = new UserService();
