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

   async likeTweet(tweetId){
      const newLike = await TweetService.find(tweetId)
      const myIndex = newLike.likes.findIndex(el => el == id)
      if (myIndex !== -1) {
         newLike.likes.splice(myIndex, 1)
         console.log("unliked")
      }else{
         newLike.likes.push(id)
         console.log("liked")}
      newLike.save()
      return newLike
   }

   async deleteTweet(tweetId){
      //const tweetDel = await TweetService.find(tweetId)
      const myUser = await this.find(id)
      const delIndex = myUser.tweets.findIndex(el => el == tweetId)
      if (delIndex !== -1) {
         myUser.tweets.splice(delIndex, 1)
         console.log(`tweet deleted. New tweet list: ${myUser.tweets}`)
         myUser.save()
         return myUser
      } else {
         console.log("Tweet not found in user's list. How did u even send request???")
         return "bruh"
      }
   }

};

module.exports = new UserService();