const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')


const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        validate: [isEmail, 'invalid email'],
        require: true
    },
    password: {
        type: String,
        require: true
    },
    notification: {
        type: Boolean,
        require: false
    }
})

const userModel = model('users', userSchema)
exports.userModel = userModel