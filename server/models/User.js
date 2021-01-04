const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    UserName: String,
    Email: String,
    HashCode: String,
    FirstName: String,
    LastName: String,
    IsAdmin: Boolean,
    img:
    {
        data: String,
        contentType: String,
    }
});

module.exports = mongoose.model('User', UserSchema)