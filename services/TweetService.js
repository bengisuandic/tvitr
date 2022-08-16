const BaseService = require("./BaseService");
const TweetModel = require("../models/Tweet");

class TweetService extends BaseService{
    model = TweetModel;

    async writeAllTweets(){
        return await TweetModel.find().populate('user', ["_id username name"])
    }
};

module.exports = new TweetService();