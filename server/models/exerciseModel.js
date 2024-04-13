const mongoose = require('mongoose')

const excSchema = new mongoose.Schema({
    id: {type: String}, //api id (if from api)
    name: {type: String, required: true},
    force: {type: String, required: true},
    equipment: {type: String, required: true},
    instructions: {type: String, required: true},
    primaryMuscleGroups: [{type: String, required: true}],
    primaryMuscles: [{type: String}],
    secondaryMuscleGroups: [{type: String}],
    secondaryMuscles: [{type: String}],
    tags: [{type: String}],
    type: {type: String}
})

const exerciseModel = mongoose.model("exercises", excSchema)

module.exports = exerciseModel