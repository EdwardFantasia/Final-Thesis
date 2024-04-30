const express = require('express')
const userModel = require('../models/userModel')
const exerciseModel = require('../models/exerciseModel')
const workoutModel = require('../models/workoutModel')
const mealModel = require('../models/mealModel')

const router = express.Router()

router.get("/getBaseUserI/:userString", async (req, res) => {
    let userArray = []
    const users = await userModel.find({username: {$regex: req.params.userString}})
    users.forEach(user => {
        userArray.push({username: user.username, picture: user.picture})
    })
    console.log(userArray)
    res.json(userArray)
})

router.get("/getMoreUserI/:username", async (req, res) => {
    //TODO: NEED TO REDO
    const user = await userModel.findOne({username: req.params.username})
    if(user){
        let temp = []
        for(let i = 0; i < user.workouts.length; i++){
            let tmpExcArr = []
            const workoutObj = await workoutModel.findOne({_id: user.workouts[i]})
            for(let j = 0; j < workoutObj.exercises.length; j++){
                let tmpExc = {}
                const exerciseObj = await exerciseModel.findOne({_id: workoutObj.exercises[j].exerciseItem})
                tmpExc.exerciseItem = exerciseObj
                tmpExc.sets = workoutObj.exercises[j].sets
                tmpExc.reps = workoutObj.exercises[j].reps
                tmpExcArr.push(tmpExc)
            }
            console.log(temp)
            temp.push({workoutName: workoutObj.workoutName, workoutDesc: workoutObj.workoutDesc, exercises: tmpExcArr})
        }

        let tempMeals = []
        for(let i = 0; i < user.meals.length; i++){
            const mealObj = await mealModel.findOne({_id: user.meals[i]})
            tempMeals.push(mealObj)
        }

        console.log("responding with: ", temp)
        res.json({username: user.username, picture: user.picture, workouts: temp, meals: tempMeals})
    }
})

router.patch("/setPic", async (req, res) => {
    console.log(req.body.username)
    var patchUser = await userModel.findOne({username: req.body.username})
    console.log(patchUser)
    console.log(req.body.picUrl)
    console.log(typeof req.body.picUrl)
    patchUser.picture = req.body.picUrl
    await patchUser.save()
    console.log(patchUser.picture)
    res.json({success: true})
})

router.post("/signIn", async (req, res) => {
    //TODO: try to remove for loop
    console.log("body: ", req.body)
    const user = await userModel.findOne({$or: [{email: req.body.login1}, {username: req.body.login1}], password: req.body.password})
    if(user){
        let temp = []
        for(let i = 0; i < user.workouts.length; i++){
            let tmpExcArr = []
            let workoutObj = await workoutModel.findOne({_id: user.workouts[i]})
            for(let j = 0; j < workoutObj.exercises.length; j++){
                let tmpExc = {}
                if(!Array.isArray(workoutObj.exercises[j].exerciseItem)){
                    const exerciseObj = await exerciseModel.findOne({_id: workoutObj.exercises[j].exerciseItem})
                    tmpExc.exerciseItem = {
                        _id: exerciseObj._id,
                        name: exerciseObj.name,
                        instructions: exerciseObj.instructions
                    }
                }
                else{
                    let tmpRandArray = []
                    for(let k = 0; k < workoutObj.exercises[j].exerciseItem.length; k++){
                        const exerciseObj = await exerciseModel.findOne({_id: workoutObj.exercises[j].exerciseItem[k]})
                        tmpRandArray.push({_id: exerciseObj._id, name: exerciseObj.name, instructions: exerciseObj.instructions})
                    }
                    tmpExc.exerciseItem = tmpRandArray
                }
                tmpExc.sets = workoutObj.exercises[j].sets
                tmpExc.reps = workoutObj.exercises[j].reps
                tmpExcArr.push(tmpExc)
            }
            console.log(temp)
            temp.push({_id: workoutObj._id, workoutName: workoutObj.workoutName, workoutDesc: workoutObj.workoutDesc, exercises: tmpExcArr})
        }

        let tempMeals = []
        let tempMeal = {}
        for(let i = 0; i < user.meals.length; i++){
            //TODO: NEED TO REMOVE MONGOOBJ IDS FROM INGREDS AND EQUIP
            const mealObj = await mealModel.findOne({_id: user.meals[i]})

            tempMeal = {
                _id: mealObj._id,
                id: mealObj.id,
                title: mealObj.title,
                summary: mealObj.summary
            }
            tempMeals.push(tempMeal)
        }

        console.log("responding with: ", temp)
        res.json({username: user.username, picture: user.picture, workouts: temp, meals: tempMeals})
    }
})

router.post("/createUser", async (req, res) => {
    console.log("body: ", req.body)
    userModel.create(req.body)
    .then(async (result, err) => {
        if(!err){
            console.log("result: " + result)
            res.json(result)
        }
        else{
            res.send(err)
        }
    })
})

module.exports = router