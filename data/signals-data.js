/*globals require module*/
"use strict";

const mongoose = require("mongoose");
const constants = require("../config/utils/constants");
const Signal = require("../models/signal-model");

mongoose.connect(constants.connectionString);

const db = mongoose.connection;

db.on("error", (err) => {
    console.log("Error with connection: " + err);
});

db.on("open", () => {
    console.log("Successfully connected to database");
});

module.exports = {
    findAll() {
        let query = Signal.find().where({});
        return Promise.resolve(query.exec());
    },
    findByRegisteredNumber(number) {
        let query = Signal.findOne()
            .where({
                registeredNumber: number
            });

        return Promise.resolve(query.exec());
    },
    createSignal(obj, registeredNumber) {
        let signal = new Signal({
            registeredNumber: registeredNumber,
            firstname: obj.firstname,
            lastname: obj.lastname,
            description: obj.description,
            number: obj.number,
            lat: obj.lat,
            lng: obj.lng,
            answer: "Сигналът все още не е проверен. Моля, опитайте по-късно!"
        });

        return Promise.resolve(signal.save());
    }
};