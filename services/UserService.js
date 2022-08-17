const BaseService = require("./BaseService");
const UserModel = require("../models/User");
const TweetService = require("./TweetService");
const LikeService = require("./LikeService");

class UserService extends BaseService {
  model = UserModel;

  async tweetAt(data, userId) {
    console.log(userId)
    const userTweet = await this.find(userId);
    const tweet = await TweetService.add({ data: data, user: userTweet });
    userTweet.tweetCount += 1;
    userTweet.save();
    return tweet;
  }

  async likeTweet(tweetId, userId) {
    const newLike = await TweetService.find(tweetId);
    const myIndex = newLike.likes.findIndex((el) => el == userId);
    if (myIndex !== -1) {
      newLike.likes.splice(myIndex, 1);
      console.log("unliked");
    } else {
      newLike.likes.push(userId);
      console.log("liked");
    }
    newLike.save();
    return newLike;
  }

  async deleteTweet(userId, tweetId) {
    try {
      const myUser = await this.find(userId);
      myUser.tweetCount -= 1;
      myUser.save();
      TweetService.del(tweetId);
      return await TweetService.query({user: myUser._id});
    } catch (error) {
      return error
    }
  }
  
}

module.exports = new UserService();
