const BaseDatabase = require("./database");;
const UserModal = require("../models/User");

class UserDatabase extends BaseDatabase{
    
};

module.exports = new UserDatabase(UserModal);