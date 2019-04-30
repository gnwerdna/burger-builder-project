const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
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

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient