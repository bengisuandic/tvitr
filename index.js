const express = require('express')
const userRouter = require('./routes/users')
const tweetRouter = require('./routes/tweets')
const cors=require('cors')
const app = express()

require('./mongo-connection')
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:8080'}))

app.use('/users', userRouter)
app.use('/tweets', tweetRouter)

app.listen(3000, () => {
  console.log('Server listening')
})