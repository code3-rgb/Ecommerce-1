const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
    age: Number,
})

const User = mongoose.model('user',UserSchema)

module.exports = User