const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required:true,
    },
    username: {
        type: String,
        required: true,
    }
})

const UserModel = mongoose.model('users',UserSchema) //parameters are name of model/collection, and the schema that represents that model
//automatically makes the collection

module.exports = UserModel //we now have access to UserModel outside this file