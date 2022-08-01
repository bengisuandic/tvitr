
//const like = require("./models/Like")
const tweet = require("./models/Tweet")
const user = require("./models/User")
const UserDatabase = require("./data/userDB")
const TweetDatabase = require("./data/TwitDB")


const burak = user.create({name:"burak",age:"44",tweets:[]})
const tweet1= tweet.create({data:"asasdsa"},burak)
TweetDatabase.save([tweet1])

const bengi = user.create({name:"bengi", age:"20"})
burak.atTwt(tweet1);
console.log("before json: ",burak.tweets);
// const tweet2 = tweet.create({data: "myTwt 1"})
UserDatabase.save([burak,bengi])
// UserDatabase.save([bengi])
const userq= UserDatabase.read()

console.log(userq[1])

// // bengi.atTwt(tweet2);
// // const userDatabase = new UserDatabase("users");

// // userDatabase.save(burak);
// // userDatabase.save(bengi);

// const users = userDatabase.read("users")
// console.log(users)
