const express = require('express')
const mealModel = require('../models/mealModel')
const userModel = require('../models/userModel')

const router = express.Router()

router.get("/", (req, res) => {
    
})

router.post("/createMeal", async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username })
        if (user) {
            let temp = []
            for (let i = 0; i < req.body.meals.length; i++) {
                const meal = req.body.meals[i]
                let mealID = ""
                const mealI = await mealModel.findOne({ id: meal.id })
                if (mealI) {
                    mealID = mealI._id;
                } else {
                    const newMeal = await mealModel.create(meal)
                    mealID = newMeal._id
                }
                temp.push(mealID)
            }
            user.meals = user.meals.concat(temp)
            await user.save()
            res.json({ success: true })
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post("/", async (req, res) => {
    
})

module.exports = router