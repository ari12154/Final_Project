const express = require('express')
const {userModel} = require("../db/models/userModel");
const router = express.Router()



router.get('/', async (req, res, next) => {
    const users = await userModel.find({})
    res.json({users})
})

router.post('/', async (req, res, next) => {
    console.log(req.body)
    let newUser = new userModel(req.body);
    let user = await userModel.exists({email: req.body.email})
    if (!user) {
        await newUser.save();
    }
    res.json(newUser)
})

router.put('/:id', async (req, res, next) => {
    let dataSaved = req.body
    try {
        const userAfterUpdate = await userModel.updateOne({_id: req.params.id}, dataSaved)
        res.json(userAfterUpdate)
    } catch (err) {
        console.log(err.message)
    }

})

router.delete('/:id', async (req, res, next) => {
    try {
        const userAfterUpdate = await userModel.deleteOne({_id: req.params.id})
        res.json(userAfterUpdate)
    } catch (err) {
        console.log(err.message)
    }

})


module.exports = router