const express = require('express')
const userModel = require('../models/userModel')
const exerciseModel = require('../models/exerciseModel')
const workoutModel = require('../models/workoutModel')

const router = express.Router()

router.get("/getUser/:username", (req, res) => {
    userModel.find({username: req.params.username}).then((users) => {
        res.json(users)
    }).catch(function(err){
        console.log(err)
    })
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
        console.log("responding with: ", temp)
        res.json({username: user.username, workouts: temp})
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