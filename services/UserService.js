const BaseService = require("./BaseService");
const UserModel = require("../models/User");
const TweetService = require("./TweetService");
const LikeService = require("./LikeService");

class UserService extends BaseService {
  model = UserModel;

  async tweetAt(data, userId) {
    // console.log(userId)
    const userTweet = await this.find(userId);
    const tweet = await TweetService.add({ data: data, user: userTweet });
    userTweet.tweetCount += 1;
    userTweet.save();
    return tweet;
  }

  async likeTweet(tweetId, userId) {
    const likeUser = await this.find(userId);
    console.log("LikeUser:", String(likeUser._id));
    const newLike = await TweetService.find(tweetId);
    console.log("List El:", newLike.likes);

    const myIndex = newLike.likes.findIndex(
      (el) => String(el._id) === String(likeUser._id)
    );
    console.log("IdIndex: ", myIndex);
    if (myIndex !== -1) {
      newLike.likes.splice(myIndex, 1);
      console.log("unliked");
    } else {
      newLike.likes.push(likeUser);
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
      return "success";
      // TweetService.del(tweetId);
      // return await TweetService.query({user: myUser._id});
    } catch (error) {
      return error;
    }
  }

  //handle both follow and unfollow
  async handleFollow(stalker, userId) {
    try {
      const myUser = await this.find(stalker)
      const toFollow = await this.find(userId)
      const myIndex = myUser.following.findIndex((el) => String(el._id) === String(toFollow._id));
      const followerIndex = toFollow.followers.findIndex((el) => String(el._id) === String(myUser._id));
      //.populate("username _id _img name");
      // console.log("Handle follow");
      // console.log("myUser", myUser);
      // console.log("toFollow", toFollow);
      // console.log("indexes:", myIndex, followerIndex); 
      if (myIndex === -1) {
        myUser.following.push(toFollow);
        toFollow.followers.push(myUser);
      } else {
        myUser.following.splice(myIndex, 1);
        toFollow.followers.splice(followerIndex, 1);
      }
      myUser.save();
      toFollow.save();
      const resp = {myUser: myUser, object: toFollow}
      return resp;
      // TweetService.del(tweetId);
      // return await TweetService.query({user: myUser._id});
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserService();
