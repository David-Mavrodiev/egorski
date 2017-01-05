/*globals require module*/
'use strict';

const mongoose = require('mongoose');
const constants = require('../config/utils/constants');
const Feedback = require('../models/feedback-model');

mongoose.connect(constants.connectionString);

const db = mongoose.connection;

db.on("error", (err) => {
    console.log("Error with connection: " + err);
});

db.on("open", () => {
    console.log("Successfully connected to database");
});

module.exports = {
    getAll() {
        let query = Feedback.find().where({});
        return Promise.resolve(query.exec());
    },
    create(obj) {
        let feedback = new Feedback({
            firstname: obj.firstname,
            lastname: obj.lastname,
            text: obj.text
        });

        return Promise.resolve(feedback.save());
    }
};