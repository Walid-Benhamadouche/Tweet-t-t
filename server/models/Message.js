const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    roomId: String,
    body: String,
    userName: String,
    userId: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message', MessageSchema)