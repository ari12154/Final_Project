const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://TaskMengement:208389403@cluster0.ekk5i.mongodb.net/TaskMenegemet-DB')

const db = mongoose.connection;

db.on('error', console.error.bind('connection error'));
db.once('open', () => {
    console.log('mongo connected')
})

module.exports = db;
