const express = require('express')
const workoutModel = require('../models/workoutModel')
const excModel = require('../models/exerciseModel')
const userModel = require('../models/userModel')

const router = express.Router()

router.post("/createWorkout", async (req, res) => {
    //TRY TO REWRITE
    try {
        const user = await userModel.findOne({ username: req.body.username })
        if (user) {
            let temp = []
            let serverResp = [] //response array (name, instructions, objectID)
            for (let i = 0; i < req.body.exercises.length; i++) {
                let exerciseItem = req.body.exercises[i].exerciseItem
                let exerciseID = ""
                if(!Array.isArray(exerciseItem)){
                    const exerciseI = await excModel.findOne({ id: exerciseItem.id })
                    if (exerciseI) {
                        exerciseID = exerciseI._id;
                    } else {
                        const newExercise = await excModel.create(exerciseItem)
                        exerciseID = newExercise._id
                    }
                    temp.push({ exerciseItem: exerciseID, sets: req.body.exercises[i].sets, reps: req.body.exercises[i].reps })
                }else{
                    let tmpRand = []
                    for(let j = 0; j < exerciseItem.length; j++){
                        const exerciseI = await excModel.findOne({ id: exerciseItem[j].id })
                        if (exerciseI) {
                            exerciseID = exerciseI._id;
                        } else {
                            const newExercise = await excModel.create(exerciseItem[j])
                            exerciseID = newExercise._id
                        }
                        tmpRand.push(exerciseID)
                    }
                    temp.push({exerciseItem: tmpRand, sets: req.body.exercises[i].sets, reps: req.body.exercises[i].reps })
                }
            }
            const workout = await workoutModel.create({ workoutName: req.body.workoutName, workoutDesc: req.body.workoutDesc, exercises: temp })
            user.workouts.push(workout._id)
            await user.save()
            res.json({ success: true })
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router