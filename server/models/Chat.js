const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    User1: String,
    User2: String
})

module.exports = mongoose.model('CHat', ChatSchema)