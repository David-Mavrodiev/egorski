/*globals require module*/

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model('User', userSchema);

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;