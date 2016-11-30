/*globals require module*/

let mongoose = require("mongoose");

let chatSchema = new mongoose.Schema({
    admin: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    messages: {
        type: [{}],
        default: []
    }
});

mongoose.model("Chat", chatSchema);

let chatModel = mongoose.model("Chat");

module.exports = chatModel;