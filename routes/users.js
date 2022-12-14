require("dotenv").config();

const express = require("express");
const router = express.Router();
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
router.post("/signup", async (req, res) => {
  try {
    const userExists = await UserService.query({username: req.body.username});
     if (userExists.length > 0) {
        res.status(401).send("Username already taken")
      } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newBody = req.body;
      newBody.password = hashedPassword;
      const newUser = await UserService.add(newBody);
      res.status(200).send(newUser);
     }
  } catch (error) {
    console.log(error)
    console.log("Something went wrong adding the user");
    res.status(500);
  }
});

//Login, create and send token
router.post("/login", async (req, res) => {
  try {
    const userQ = await UserService.query({ username: req.body.username });
    const user = userQ[0];
    if (user == null) {
      return res.status(400).send("No such user");
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20h" }
      );
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET
      );
      refreshTokens.push(refreshToken);
      const sendThis = {
        user: user,
        token: accessToken,
        reToken: refreshToken,
      };
      res.send(sendThis);
    } else {
      res.status(400).send("Wrong password");
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

//Get a single user by id
router.get("/singleUser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const myUser = await UserService.find(userId);
    res.send(myUser);
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
});

let refreshTokens = [];

//Wrote this but I dont really understand the concept
router.post("/token", (req, res) => {
  const refreshToken = req.body.reToken;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20h" }
    );
    res.json({ accessToken: accessToken });
  });
});

//connections go brr
router.get("/handleFollow/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const stalker = await UserService.handleFollow(req.user._id, userId);
    console.log(stalker);
    res.status(200).send(stalker);
  }catch (err) {
    res.status(404).json({
      status: "Failed to follow/unfollow", 
      message: err.message,
    });
  }
});
module.exports = router;
