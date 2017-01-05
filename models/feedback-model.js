/*globals require module*/

let mongoose = require('mongoose');

let feedbackSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

mongoose.model('Feedback', feedbackSchema);

let feedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = feedbackModel;