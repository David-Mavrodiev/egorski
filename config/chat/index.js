/*globals module require*/
'use strict';

const chatData = require('../../data/chats-data');

module.exports = function(server) {
    var io = require('socket.io').listen(server);

    io.on('connection', function(socket) {
        socket.on('restore messages', function(info) {
            let admin = info.admin;
            let user = info.user;
            chatData.findByUserAndAdmin(admin, user).then((chat) => {
                let messages = null;
                if (chat != null) {
                    messages = chat.messages;
                }
                if (messages) {
                    io.emit('restore messages ' + admin + ' ' + user, messages);
                } else {
                    chatData.createChat(admin, user);
                    chatData.createChat(user, admin);
                }
            });
        });
        socket.on('chat message', function(info) {
            let author = info.author;
            let admin = info.admin;
            let user = info.user;
            let msg = info.message;

            chatData.findByUserAndAdmin(admin, user).then((chat) => {
                if (chat != null) {
                    chat.messages.push({
                        author: author,
                        user: user,
                        admin: admin,
                        message: msg
                    });
                    io.emit('chat message ' + admin + ' ' + user, {
                        author: author,
                        message: msg
                    });
                    chat.save();
                }
            });

            chatData.findByUserAndAdmin(user, admin).then((chat) => {
                if (chat != null) {
                    chat.messages.push({
                        author: author,
                        user: user,
                        admin: admin,
                        message: msg
                    });
                    io.emit('chat message ' + user + ' ' + admin, {
                        author: author,
                        message: msg
                    });
                    chat.save();
                }
            });
        });
    });
}