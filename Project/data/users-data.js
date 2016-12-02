/*globals require module*/
'use strict';

const mongoose = require('mongoose');
const constants = require('../config/utils/constants');
const User = require('../models/user-model');

mongoose.connect(constants.connectionString);

const db = mongoose.connection;

db.on("error", (err) => {
    console.log("Error with connection: " + err);
});

db.on("open", () => {
    console.log("Successfully connected to database");
});

module.exports = {
    findByUsername(username) {
        let query = User.findOne()
            .where({
                username: new RegExp(username, "i")
            });

        return Promise.resolve(query.exec());
    },
    findByIsAdmin(condition) {
        let query = User.find()
            .where({
                IsAdmin: condition
            });

        return Promise.resolve(query.exec());
    },
    createUser(obj) {
        let user = new User({
            username: obj.username,
            password: obj.password,
            IsAdmin: false
        });

        return Promise.resolve(user.save());
    }
};