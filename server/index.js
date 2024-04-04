const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://127.0.0.1:27017/Exercise365")

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, index: {unique: true}},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    authenticated: {
        type: Boolean,
        default: 0
    },
    workouts: {
        type: Array,
        default: []
    },
    meals: {
        type: Array,
        default: []
    }
})

const userModel = mongoose.model("user", userSchema)

app.get("/getUsers", (req, res) => {
    userModel.find({}).then((users) => {
        res.json(users)
    }).catch(function(err){
        console.log(err)
    })
})

app.post("/signIn", (req, res) => {
    console.log("body: ", req.body)
    userModel.findOne({$or: [{email: req.body.login1}, {username: req.body.login1}], password: req.body.password})
    .then(async (user, err) => {
        if(!err){
            console.log('result: ' + user)
            res.json(user)
        }
        else{
            console.log('err: ' + err)
            res.send(err)
        }
    })
})

app.post("/createUser", async (req, res) => {
    console.log("body: ", req.body)
    userModel.create(req.body)
    .then(async (result, err) => {
        if(!err){
            res.json(result)
        }
        else{
            res.send(err)
        }
    })
})

app.listen(3001, () => {
    console.log('Server is running')
})