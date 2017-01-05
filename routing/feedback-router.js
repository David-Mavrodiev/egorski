'use strict';

const router = require('express').Router(),
    createFeedbackController = require('../controller/feedback-controller'),
    feedbackData = require('../data/feedback-data');

const feedbackController = createFeedbackController(feedbackData);

module.exports = app => {
    router
        .post('/feedback', feedbackController.create)

    app.use(router);
};