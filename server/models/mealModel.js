const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
    name: {type: String, required: true},
    instructions: {type: String, required: true},
    ingredients: {type: String, required: true}, 
    healthInfo: {
        calories: {type: Number, required: true},
        fat: {type: Number, required: true},
        carbs: {type: Number, required: true},
        protein: {type: Number, required: true},
        cholesterol: {type: Number, required: true},
        sodium: {type: Number, required: true},
        sugar: {type: Number, required: true}
    }
})

const mealModel = mongoose.model("meal", mealSchema)

module.exports = mealModel