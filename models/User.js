//I am removing "user.tweets" since it is unnecessary and brings me trouble ty

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    age: {
        type: Number,
        required: [true, 'A user must have an age']
    },

    tweetCount: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;