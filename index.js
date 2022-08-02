
//const like = require("./models/Like")
const Tweet = require("./models/Tweet")
const User = require("./models/User")
const UserDatabase = require("./data/userDB")
const TweetDatabase = require("./data/TwitDB")


const burak = new User("burak","44")
const bengi = new User("bengi", "20")
const tweet1= new Tweet("asasdsa",burak)//aşağıkiyle aynı bunlar her türlü olur sorun yok
const tweet2 = Tweet.create({data: "myTwt 1"})
bengi.atTwt(tweet2)
burak.atTwt(tweet1);
TweetDatabase.save([tweet1,tweet2])
UserDatabase.save([burak])
UserDatabase.insert([bengi])
const users= UserDatabase.read()
const allTweets = TweetDatabase.read()

console.log(users,allTweets)
console.log(users[0].tweets)
