const {Schema, model} = require('mongoose')

const taskSchema = new Schema({
    date: String,
    taskName: String,
    complete: Boolean
})

const listsSchema = new Schema({
    id: Date,
    status: String,
    tasks: [taskSchema]
})

const workSpaceSchema = new Schema({
    id: Date,
    user: String,
    name: String,
    lists: [listsSchema]
})

const workSpaceModel = model('spaces', workSpaceSchema);
exports.workSpaceModel = workSpaceModel;