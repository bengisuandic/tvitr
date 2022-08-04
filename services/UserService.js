const BaseService = require("./BaseService");;
const UserModel = require("../models/User");
const TweetService = require("./TweetService");
const LikeService = require("./LikeService");
let id= "62ea6bd11650b12aa0ef43d1"
//let tweetId = "62ea766c3eafffbb27f22afa"
class UserService extends BaseService{
   model=UserModel
    
   async tweetAt(data){
     const tweet= await TweetService.add({data:data, user:id})
     const userTweet = await this.find(id)
     userTweet.tweets.push(tweet)
     userTweet.save()
     return tweet
   }

   async likeTweet(tweet){
      const userLike = await this.find(id)
      const newLike = await LikeService.add({tweet: tweet, user: userLike})
      tweet.likes.push(newLike)
      tweet.save() 
      return newLike
   }

};

module.exports = new UserService();