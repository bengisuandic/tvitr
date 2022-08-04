const BaseService = require("./BaseService");
const TweetModel = require("../models/Tweet");

class TweetService extends BaseService{
    model = TweetModel;
};

module.exports = new TweetService();