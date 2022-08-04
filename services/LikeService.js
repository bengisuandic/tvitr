const BaseService = require("./BaseService");
const LikeModel = require("../models/Like");

class LikeService extends BaseService{
    model = LikeModel;
};

module.exports = new LikeService();