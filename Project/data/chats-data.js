/*globals require module*/
'use strict';

const mongoose = require('mongoose');
const constants = require('../config/utils/constants');
const Chat = require('../models/chat-model');

mongoose.connect(constants.connectionString);

const db = mongoose.connection;

db.on("error", (err) => {
    console.log("Error with connection: " + err);
});

db.on("open", () => {
    console.log("Successfully connected to database");
});

module.exports = {
    findByUserAndAdmin(admin, user) {
        let query = Chat.findOne()
            .where({
                admin: admin,
                user: user
            });

        return Promise.resolve(query.exec());
    },
    createChat(admin, user) {
        let chat = new Chat({
            admin: admin,
            user: user,
            messages: []
        });
        return Promise.resolve(chat.save());
    }
};