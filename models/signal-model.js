/*globals require module*/
"use strict";

let mongoose = require("mongoose");

let signalSchema = new mongoose.Schema({
    registeredNumber: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

mongoose.model("Signal", signalSchema);

let signalModel = mongoose.model("Signal");

module.exports = signalModel;