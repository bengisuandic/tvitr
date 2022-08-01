const BaseDatabase = require("./database");;
const TwitModel = require("../models/Tweet");

class TweetDatabase extends BaseDatabase{
    
};

module.exports = new TweetDatabase(TwitModel);