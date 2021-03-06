const express = require("express");
const router = new express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");
router.post("/orders", auth, async (req, res) => {
  const order = new Order({
    ...req.body,
    customer: {
      ...req.body.customer,
      owner: req.user._id
    }
  });
  console.log(order);
  try {
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/orders", auth, async (req, res) => {
  try { 
    const ordersData = await Order.find({"customer.owner": req.user._id});
    console.log(ordersData);
    // await req.user
    //   .populate({
    //     path: "orders"
    //   })
    //   .execPopulate();
    res.status(200).send(ordersData);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
