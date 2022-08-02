
class User {
    constructor(name,age,tweets=[]) {
        this.name = name;
        this.age = age;
        this.tweets = tweets;
    }
    
    atTwt(tweet){
       this.tweets.push(tweet)
       //Burada TweetDatabase dahil edilip atılan tiwitler oraya kayıt edilebilir.
       //sana ödev yap bunu :D
    }
    
    likeAtwt(tweet){
        let pushLike = new Like(this, tweet)
        tweet.likes.push(pushLike)
    }

    static create({name,age,tweets}){
        return new User(name,age,tweets)
        /**
         * const user = new User({name,age})
         * user.tweets=tweets
         * 
         * aynı bunlar
         */
    }
}
module.exports= User