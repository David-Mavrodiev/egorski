'use strict';

const router = require('express').Router(),
    createPagesController = require('../controller/pages-controller'),
    signalsData = require('../data/signals-data');

const pagesController = createPagesController(signalsData);



module.exports = app => {
    router
        .get('/home', pagesController.getHome)
        .get('/help', pagesController.getHelp)
        .get('/send', pagesController.getSend)
        .post('/send', pagesController.send)
        .get('/response', pagesController.getResponse)
        .post('/response', pagesController.response);

    app.use(router);
};