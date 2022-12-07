const express = require('express')
const {workSpaceModel} = require("../db/models/workSpaceModel");
const router = express.Router()


router.get('/', async (req, res, next) => {
    const spaces = await workSpaceModel.find({})
    res.json({spaces})
})

router.post('/', async (req, res, next) => {
    console.log(req.body)
    let workSpace = new workSpaceModel(req.body);
    await workSpace.save();
    res.json(workSpace)
})
router.delete('/:id/:user', async (req, res, next) => {
    try {
        let data = await workSpaceModel.deleteOne({_id: req.params.id, user: req.params.user})
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

router.put('/:id', async (req, res, next) => {
    let dataSaved = req.body
    try {
        let data = await workSpaceModel.updateOne({_id: req.params.id}, dataSaved)
        console.log(data)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router