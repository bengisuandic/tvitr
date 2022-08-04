const express = require('express')
const router = express.Router()
const UserService = require('../services/UserService')


router.get('/all', async (req, res) => {
    const people = await UserService.findAll()
    res.send(people)
})

router.post('/',async (req,res)=>{
    const newUser = await UserService.add(req.body)
    res.status(200).send(newUser)
})

router.post('/likeTweet', async(req, res) => {
    try {
        console.log("hello res")
        const tweetId = req.body.tweetId
        console.log(tweetId)
        const myTweet = await TweetService.find(tweetId)
        const liked = await UserService.likeTweet(myTweet)
        res.status(200).send(liked)

    } catch (err) {
        res.status(404).json({
          status: 'Fail',
          message: err,
        });
      }
})

module.exports = router