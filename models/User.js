
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema ({
 
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    age: {
        type: Number,
        required: [true, 'A user must have an age']
    },
    tweets: [{
        type: mongoose.SchemaTypes.ObjectId,
            ref: 'Tweet',
            
    }]

});


const User = mongoose.model("User", userSchema);

module.exports = User;