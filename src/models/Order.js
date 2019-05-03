const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String
    },
    street: {
      type: String
    },
    zipCode: {
      type: String
    }
  },
  deleveryMethod: {
    type: String,
    default: "fastest"
  },
  ingredients: {
    meat: {
      type: Number,
      default: 0
    },
    salad: {
      type: Number,
      default: 0
    },
    cheese: {
      type: Number,
      default: 0
    },
    bacon: {
      type: Number,
      default: 0
    }
  },
  price: {
    type: Number,
    default: 4
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
