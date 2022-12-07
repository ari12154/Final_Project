const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const cron = require('node-cron')
require('../db/mongoConnect')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const PORT = 3001 | process.env.PORT

const {routesInit} = require('./configRouters/config')
routesInit(app)

const {getUsers} = require('./scheduleEmails')

cron.schedule('59 23 * * *', () => {
    getUsers().then()
})

app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`)
})
