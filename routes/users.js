require('dotenv').config();

const express = require("express");
const router = express.Router();

const TweetService = require("../services/TweetService");
const UserService = require("../services/UserService");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const auth = require("../middlewares/auth");

//Get all users (maybe an admin thing?)
router.get("/all", async (req, res) => {
  const people = await UserService.findAll();
  res.send(people);
});



//Create user (hashing password for security)
router.post("/signIn", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newBody = req.body;
    newBody.password = hashedPassword;
    const newUser = await UserService.add(newBody);
    res.status(200).send(newUser);
  } catch (error) {
    console.log("Something went wrong adding the user");
    res.status(500);
  }
});


//Login, create and send token
router.post("/login", async (req, res) => {
  const userQ = await UserService.query({username: req.body.username});
  const user = userQ[0];
  if(user == null){
    return res.status(400).send('Cannot find user');
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)){
      console.log("hm?")
      
      const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'})
      const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET)

      const sendThis = {user: user, token: accessToken, reToken: refreshToken};
      res.send(sendThis);
    } else{
      res.send("Wrong password")
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

//Get a single user by id
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const myUser = await UserService.find(userId);
    res.send(myUser);
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
});





module.exports = router;
