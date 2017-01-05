'use strict';

const router = require('express').Router(),
    createPagesController = require('../controller/pages-controller'),
    signalsData = require('../data/signals-data'),
    feedbackData = require('../data/feedback-data');

const pagesController = createPagesController(signalsData, feedbackData);

module.exports = app => {
    router
        .get('/home', pagesController.getHome)
        .get('/help', pagesController.getHelp)
        .get('/send', pagesController.getSend)
        .post('/send', pagesController.send)
        .get('/response', pagesController.getResponse)
        .post('/response', pagesController.response)
        .get('/signal/:registeredNumber', pagesController.getSignal)
        .get('/signals', pagesController.getAllSignals)
        .post('/signals', pagesController.updateSignal)
        .get('/', pagesController.getHome);

    app.use(router);
};