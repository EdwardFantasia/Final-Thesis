const express = require('express')
const excModel = require('../models/exerciseModel')

const router = express.Router()

router.get("/getExercise/:id", async (req, res) => {
    try{
    const exc = await excModel.findOne({_id: req.params.id})
    if(exc){
        res.json(exc)
    }
} catch(err){}
})

module.exports = router