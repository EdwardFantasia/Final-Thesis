const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    instructions: {type: String},
    ingredients: [{
        name: {type: String},
        image: {type: String}
    }],
    equipment: [{
        name: {type: String},
        image: {type: String}
    }],
    healthInfo: {
        calories: {type: Number},
        fat: {type: Number},
        carbs: {type: Number},
        protein: {type: Number},
        cholesterol: {type: Number},
        sodium: {type: Number},
        sugar: {type: Number}
    }
})

const mealModel = mongoose.model("meal", mealSchema)

module.exports = mealModel