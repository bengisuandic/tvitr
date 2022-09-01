const BaseService = require("./BaseService");
const TweetModel = require("../models/Tweet");
const paginate = require("mongoose-paginate-v2")

class TweetService extends BaseService{
    model = TweetModel;

    async writeAllTweets(){
        const options = {
            page: 1,
            limit: 5,
            sort: {date: -1},
            collation: {
              locale: 'en',
            },
            populate: {path:'user likes', select:"_id username name _img"}
          };
          
         const reducedTweets = await TweetModel.paginate({}, options );
         console.log(reducedTweets)
         return reducedTweets;
        // return await TweetModel.find().populate('user likes', "_id username name _img")
    }
    async find(tweetId){
        return await TweetModel.findById(tweetId).populate('user', "_id username name _img")
    }
};

module.exports = new TweetService();