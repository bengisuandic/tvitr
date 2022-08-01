
class User {
    constructor(name,age,tweets=[]) {
        this.name = name;
        this.age = age;
        this.tweets = [];
    }
    
    atTwt(tweet){
       this.tweets.push(tweet)
    }
    
    likeAtwt(tweet){
        let pushLike = new Like(this, tweet)
        tweet.likes.push(pushLike)
    }

    static create({name,age,tweets}){
        return new User(name,age,tweets)
    }
}
module.exports= User