const mongoose = require('mongoose')

const TweetSchema = mongoose.Schema({
    UserId: String,
    Body: String
})

module.exports = mongoose.model('Tweet', TweetSchema)