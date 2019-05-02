const mongoose = require('mongoose');

const burgerSchema = new mongoose.Schema({
    salad: {
        type: Number,
        default: 0
    },
    meat: {
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
});

const Burger = mongoose.model('Burger', burgerSchema);

module.exports = Burger