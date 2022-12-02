const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('../db/mongoConnect')
const {workSpaceModel} = require('../db/models/workSpaceModel')
const {userModel} = require('../db/models/userModel')
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const PORT = 3001 | process.env.PORT

app.get('/', async (req, res, next) => {
    const spaces = await workSpaceModel.find({})
    res.json({spaces})
})

app.post('/', async (req, res, next) => {
    console.log(req.body)

    let workSpace = new workSpaceModel(req.body);
    await workSpace.save();
    res.json(workSpace)
})

app.get('/users', async (req, res, next) => {
    const users = await userModel.find({})
    res.json({users})
})

app.post('/users', async (req, res, next) => {
    console.log(req.body)
    let newUser = new userModel(req.body);
    let user = await userModel.exists({email: req.body.email})

    if (!user) {
        await newUser.save();
    }
    res.json(newUser)
})

app.put('/users/:id', async (req, res, next) => {
    let dataSaved = req.body
    try {
        const userAfterUpdate = await userModel.updateOne({_id: req.params.id}, dataSaved)
        console.log(userAfterUpdate)
        res.json(userAfterUpdate)
    } catch (err) {
        console.log(err.message)
    }

})

app.delete('/users/:id', async (req, res, next) => {
    try {
        const userAfterUpdate = await userModel.deleteOne({_id: req.params.id})
        res.json(userAfterUpdate)
    } catch (err) {
        console.log(err.message)
    }

})

app.delete('/:id/:user', async (req, res, next) => {
    try {
        let data = await workSpaceModel.deleteOne({_id: req.params.id, user: req.params.user})
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

app.put('/:id', async (req, res, next) => {
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


app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`)
})
