const mongoose = require('mongoose')

const FollowSchema = mongoose.Schema({
    Follower: String,
    Following: String
})

module.exports = mongoose.model('Follow', FollowSchema)