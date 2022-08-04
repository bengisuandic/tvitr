// class Like {
//     constructor(user, tweet) {
//         this.user=user
//         this.tweet=tweet
//     }
//     static create({user,tweet}){
//         return new Like(user,tweet)
//     }
// }

// module.exports=Like

const mongoose =  require('mongoose');

const likeSchema = new mongoose.Schema ({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    tweet: {
        type: mongoose.SchemaTypes.ObjectId,
            ref: 'Tweet',
        autopopulate: true
    }
});

likeSchema.plugin(require('mongoose-autopopulate'))

const LikeModel = mongoose.model('LikeModel', likeSchema)

module.exports = LikeModel