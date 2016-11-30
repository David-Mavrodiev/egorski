'use strict';

const router = require('express').Router(),
    createPagesController = require('../controller/pages-controller'),
    signalsData = require('../data/signals-data'),
    usersData = require('../data/users-data');

const pagesController = createPagesController(signalsData, usersData);



module.exports = app => {
    router
        .get('/home', pagesController.getHome)
        .get('/help', pagesController.getHelp)
        .get('/send', pagesController.getSend)
        .post('/send', pagesController.send)
        .get('/response', pagesController.getResponse)
        .post('/response', pagesController.response)
        .get('/admins', pagesController.getAdminsList)
        .get('/chat/:username', pagesController.getChat)
        .get('/', pagesController.getHome);

    app.use(router);
};