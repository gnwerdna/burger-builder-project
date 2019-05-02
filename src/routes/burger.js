const express = require("express");
const Burger = require("../")
const router = new express.Router();

router.post("/orders", async (req, res) => {
  try {

  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
