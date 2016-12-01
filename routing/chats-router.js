'use strict';

const router = require('express').Router(),
    createChatsController = require('../controller/chats-controller'),
    usersData = require('../data/users-data');

const chatsController = createChatsController(usersData);



module.exports = app => {
    router
        .get('/admins', chatsController.getAdminsList)
        .get('/chat/:username', chatsController.getChat);

    app.use(router);
};