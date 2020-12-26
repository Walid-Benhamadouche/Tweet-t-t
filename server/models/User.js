const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    UserId: {
        type: Number,
        required: true
    },
    UserName: String,
    Email: String,
    HashCode: String,
    FirstName: String,
    LastName: String,
    IsAdmin: Boolean,
});

module.exports = mongoose.model('User', UserSchema)