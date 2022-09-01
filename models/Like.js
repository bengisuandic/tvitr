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