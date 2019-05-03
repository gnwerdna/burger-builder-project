const express = require("express");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const User = require("../models/User");

//login
router.post("/auth", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Email or password wrong!");
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      throw new Error("Email or password wrong!");
    }
    const token = await user.generateAuthToken();
    res.status(200).send({ result: { user, token }, httpCode: 200 });
  } catch (e) {
    res.status(404).json({ error: { message: e.message, httpCode: 404 } });
  }
});

//logout
router.post("/me/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return tokens.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//register user
router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("Email is existed!")
    }
    await newUser.save();
    const token = await newUser.generateAuthToken();
    // sendWelcomeEmail(user.email, user.name);
    res.status(201).send({result: { user, token }, httpCode: 201});
  } catch (e) {
    res.status(400).json({error: {message: e.message}, httpCode: 400});
  }
});
module.exports = router;
